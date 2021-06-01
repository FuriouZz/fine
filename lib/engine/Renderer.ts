import { GLContext } from "gl/constants/Types";
import State from "gl/State";
import Light from "engine/Light";
import Mesh from "engine/Mesh";
import { IRenderer, RendererRenderOptions, RendererOptions, LightsData } from "engine/Types";
import StateConfig from "gl/StateConfig";
import StateClearConfig from "gl/StateClearConfig";

const MESH = new Mesh()
const TRANSFORM = MESH.transform

export default class Renderer implements IRenderer {
  protected _currentTarget: WebGLFramebuffer = null

  gl: GLContext
  state: StateConfig
  clear: StateClearConfig
  canvas: HTMLCanvasElement
  protected _pixelRatio = 1
  width = 0
  height = 0
  list: Partial<RendererRenderOptions>[] = []

  constructor(options: Partial<RendererOptions> = {}) {
    options = {
      alpha: true,
      antialias: true,
      depth: true,
      desynchronized: false,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "default",
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      stencil: false,
      version: 1,
      ...options
    }

    this.canvas = options.canvas || document.createElement("canvas")
    const version: "webgl"|"webgl2" = options.version ? "webgl" : "webgl2"
    this.gl = this.canvas.getContext(version, {
      alpha: options.alpha,
      antialias: options.antialias,
      depth: options.depth,
      desynchronized: options.desynchronized,
      failIfMajorPerformanceCaveat: options.failIfMajorPerformanceCaveat,
      powerPreference: options.powerPreference,
      premultipliedAlpha: options.premultipliedAlpha,
      preserveDrawingBuffer: options.preserveDrawingBuffer,
      stencil: options.stencil,
    }) as GLContext

    this.state = State.fromContext(this.gl).enableViewport(true)
    this.clear = new StateClearConfig()
    this._pixelRatio = options.pixelRatio || this._pixelRatio
  }

  get pixelRatio() {
    return this._pixelRatio
  }

  set pixelRatio(pixelRatio: number) {
    if (this._pixelRatio !== pixelRatio) {
      this._pixelRatio = pixelRatio
      this.resize(this.canvas.width, this.canvas.height)
    }
  }

  get bufferWidth() {
    return this.canvas.width
  }

  get bufferHeight() {
    return this.canvas.height
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.canvas.width = width * this._pixelRatio
    this.canvas.height = height * this._pixelRatio
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
  }

  // render(options?: Partial<RendererRenderOptions>) {
  //   if (!options) return

  //   if (isNaN(options.index)) {
  //     options.index = 0
  //   }

  //   this.list.push(options)
  // }

  // process() {
  //   const sorted = this.list.sort((a, b) => {
  //     return a.index < b.index ? -1 : 1
  //   })

  //   for (let i = 0; i < sorted.length; i++) {
  //     this._apply(sorted[i])
  //   }

  //   this.list = []
  // }

  // private _apply(options?: Partial<RendererRenderOptions>) {
  render(options?: Partial<RendererRenderOptions>) {
    if (!options) return

    if (options.target !== this._currentTarget) {
      this._currentTarget = options.target
      if (options.target) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, options.target.fbo)
      } else {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
      }
    }

    if (options.target) {
      this.state.viewport(0, 0, options.target.width, options.target.height)
    } else {
      this.state.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
    }

    const autoClear = options.autoClear || options.clear
    const clear = options.clear ? options.clear : this.clear
    if (autoClear) State.applyClear(this.gl, clear)
    State.apply(this.gl, this.state)

    let lightData: LightsData
    if (options.lights) {
      lightData = {
        points: {
          count: 0,
          positions: [],
          colors: [],
          parameters: []
        }
      }

      for (const light of options.lights) {
        if (Light.isPointLight(light)) {
          ++lightData.points.count
          lightData.points.positions.push(
            light.transform.worldPosition[0],
            light.transform.worldPosition[1],
            light.transform.worldPosition[2],
          )
          lightData.points.colors.push(
            light.color[0],
            light.color[1],
            light.color[2],
          )
          lightData.points.parameters.push(
            light.cutOffDistance,
            light.decayExponent,
          )
        }
      }
    }

    let renderables = options.renderables || []
    if (options.renderable) {
      renderables.push(options.renderable)
    }

    if (options.area) {
      // const [left, top, width, height] = options.area
      // renderables = renderables.filter(item => (
      //   item.transform.worldPosition[0] >= left
      //   && item.transform.worldPosition[0] <= left + width
      //   && item.transform.worldPosition[1] >= top
      //   && item.transform.worldPosition[1] <= top + height
      // ))
    }

    if (renderables.length > 0) {
      for (let i = 0; i < renderables.length; i++) {
        renderables[i].render(options.camera, lightData)
      }
    }

    if (options.pipeline && options.geometry) {
      if (options.transform) {
        MESH.transform = options.transform
      }
      MESH.geometry = options.geometry
      MESH.pipeline = options.pipeline
      MESH.render(options.camera)
      MESH.geometry = null
      MESH.pipeline = null
      MESH.transform = TRANSFORM
    }
  }

}