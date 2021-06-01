import StateConfig from "gl/StateConfig";
import State from 'gl/State';
import { GLContext, ValidUniformType } from 'gl/constants/Types';
import { GL } from 'gl/constants/Webgl';
import Uniform from 'gl/Uniform';
import { Dispatcher } from 'lol/js/dispatcher';
import ProgramCache from 'gl/ProgramCache';

export interface PipelineAttribute {
  location: number;
  info: WebGLActiveInfo;
}

export default class Pipeline {

  protected _compiled = false
  protected vShader: WebGLShader
  protected fShader: WebGLShader
  protected _textureUnits: number[] = []
  protected _uniforms: Uniform[] = []
  protected _attributes: Record<string, PipelineAttribute> = {}
  protected _program: WebGLProgram
  protected _programKey: string

  name = "Pipeline"
  shaders = {
    vertex: null as string|null,
    fragment: null as string|null,
  }
  state = new StateConfig()

  uniforms: Record<string, ValidUniformType> = {}
  defines: Record<string, string> = {}
  precisions: string = "precision highp float;"

  onUse = new Dispatcher<Record<string, ValidUniformType>>()

  constructor(public gl: GLContext) {}

  beforeCompile() {}

  private compile() {
    if (!this._compiled) {
      this.beforeCompile()

      const defines = Object.entries(this.defines).map(([k, v]) => `#define ${k} ${v}`).join("\n")

      const vertexShader = `${defines}\n\n${this.shaders.vertex}`
      const fragmentShader = `${this.precisions}\n\n${defines}\n\n${this.shaders.fragment}`

      const { program, key } = ProgramCache.get(this.gl, vertexShader, fragmentShader)
      this._programKey = key
      this._program = program

      this.getLocations()

      this._compiled = true
    }
  }

  protected getLocations() {
    // Attributes
    let attributeLocation: number
    let attribute: WebGLActiveInfo
    let attributeCount = this.gl.getProgramParameter(this._program, GL.ACTIVE_ATTRIBUTES)
    for (let i = 0; i < attributeCount; i++) {
      attribute = this.gl.getActiveAttrib(this._program, i)
      attributeLocation = this.gl.getAttribLocation(this._program, attribute.name)
      this._attributes[attribute.name] = {
        location: attributeLocation,
        info: attribute
      }
    }

    // Uniforms
    let uniformLocation: WebGLUniformLocation
    let uniform: WebGLActiveInfo
    let uniformCount = this.gl.getProgramParameter(this._program, GL.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformCount; i++) {
      uniform = this.gl.getActiveUniform(this._program, i)

      if (uniform == null) {
        this.gl.getError()
        continue;
      }

      const name = uniform.name.replace(/\[\d+\]/, '')

      uniformLocation = this.gl.getUniformLocation(this._program, name)
      if (uniformLocation == null) continue

      this._uniforms.push(new Uniform(this, name, uniformLocation, uniform))
    }
  }

  applyState() {
    State.apply(this.gl, this.state)
  }

  popState() {
    State.pop(this.gl)
  }

  use() {
    if (!this._compiled) this.compile()
    this.gl.useProgram(this._program)
    this.onUse.dispatch(this.uniforms)
  }

  updateUniforms() {
    for (let i = 0; i < this._uniforms.length; i++) {
      const uniform = this._uniforms[i];
      if (this.uniforms.hasOwnProperty(uniform.name)) {
        uniform.set(this.uniforms[uniform.name])
      }
    }
  }

  dispose() {
    if (this._compiled) {
      ProgramCache.destroy(this.gl, this._programKey)
      this._compiled = false
    }
    const listeners = this.onUse.listeners.clone()
    for (const listener of listeners) {
      this.onUse.off(listener.fn)
    }
  }

}