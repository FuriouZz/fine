import { StateConfig } from './StateConfig';
import { State } from './State';
import { GLContext, GLShaderType } from './constants/Types';
import { GL } from './constants/GL';
import { CompileShader } from './Utils';
import { Uniform } from './Uniform';
import { Dispatcher } from '../utils/Dispatcher';

export class Pipeline extends StateConfig {

  private compiled = false
  private vShader: WebGLShader
  private fShader: WebGLShader

  gl: GLContext
  program: WebGLProgram
  vertex_shader: string
  fragment_shader: string

  attributes: Record<string, number> = {}
  uniforms: Record<string, Uniform> = {}
  onUpdateUniforms = new Dispatcher<Record<string, Uniform>>()

  constructor(public state: State = null) {
    super()
    this.gl = state.gl
  }

  compile() {
    if (!this.compiled) {
      this.vShader = CompileShader(this.gl, GLShaderType.VERTEX, this.vertex_shader)
      this.fShader = CompileShader(this.gl, GLShaderType.FRAGMENT, this.fragment_shader)

      this.program = this.gl.createProgram()
      this.gl.attachShader( this.program, this.vShader )
      this.gl.attachShader( this.program, this.fShader )
      this.gl.linkProgram( this.program )

      if (this.gl.getProgramParameter(this.program, GL.LINK_STATUS) == 0) {
        var message = "Unable to initialize the shader program"
        message += "\n" + this.gl.getProgramInfoLog(this.program)
        console.warn( message )
        return;
      }

      this.get_locations()

      this.compiled = true
    }
  }

  private get_locations() {
    // Attributes
    let attributeLocation: number
    let attribute: WebGLActiveInfo
    let attributeCount = this.gl.getProgramParameter( this.program, GL.ACTIVE_ATTRIBUTES )
    for (let i = 0; i < attributeCount; i++) {
      attribute = this.gl.getActiveAttrib( this.program, i )
      attributeLocation = this.gl.getAttribLocation( this.program, attribute.name )
      this.attributes[attribute.name] = attributeLocation
    }

    // Uniforms
    let uniformLocation: WebGLUniformLocation
    let uniform: WebGLActiveInfo
    let uniformCount = this.gl.getProgramParameter( this.program, GL.ACTIVE_UNIFORMS );


    for (let i = 0; i < uniformCount; i++) {
      uniform = this.gl.getActiveUniform( this.program, i )

      if (uniform == null) {
        this.gl.getError()
        continue;
      }

      const name = uniform.name.replace(/\[\d+\]/, '')

      uniformLocation = this.gl.getUniformLocation( this.program, name )
      if (uniformLocation == null) continue

      this.uniforms[name] = new Uniform(this.gl, uniformLocation, uniform)
    }
  }

  use() {
    if (!this.compiled) this.compile()
    this.gl.useProgram(this.program)
    this.onUpdateUniforms.dispatch(this.uniforms)
  }

  applyState() {
    this.state.apply( this ) // Apply state
  }

  popState() {
    this.state.apply() // Reset state
  }

  dispose() {
    if (this.compiled) {
      this.gl.deleteProgram(this.program)
      this.gl.deleteShader(this.vShader)
      this.gl.deleteShader(this.fShader)
      this.compiled = false
    }
  }

}