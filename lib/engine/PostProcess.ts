import { GLContext } from "gl/constants/Types";
import Geometry from "gl/Geometry";
import RenderTarget from "gl/RenderTarget";
import RenderPass from "engine/RenderPass";
import Renderer from "engine/Renderer";
import { createRectangleGeometry } from "primitives/rectangle";
import { PostProcessOptions, PostProcessRenderOption } from "engine/Types";

export default class PostProcess {

  passes: RenderPass[] = []
  geometry: Geometry
  fbos = {
    read: null as RenderTarget,
    write: null as RenderTarget,
  }
  gl: GLContext
  protected _width = 0
  protected _height = 0
  protected _pixelRatio = 1

  constructor(public renderer: Renderer, options: PostProcessOptions) {
    this.gl = renderer.gl
    this.geometry = options.geometry || createRectangleGeometry(this.gl)
    this.fbos.read = new RenderTarget(this.gl, options)
    this.fbos.write = new RenderTarget(this.gl, options)
    this._pixelRatio = options.pixelRatio || renderer.pixelRatio
  }

  get pixelRatio() {
    return this._pixelRatio
  }

  set pixelRatio(pixelRatio: number) {
    if (this._pixelRatio !== pixelRatio) {
      this._pixelRatio = pixelRatio
      this.resize(this.fbos.read.width, this.fbos.read.height)
    }
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  protected _swap() {
    const tmp = this.fbos.read
    this.fbos.read = this.fbos.write
    this.fbos.write = tmp
  }

  resize(width: number, height: number) {
    this._width = width*this._pixelRatio
    this._height = height*this._pixelRatio
    this.fbos.write.resize(this._width, this._height)
    this.fbos.read.resize(this._width, this._height)
  }

  addPass(pass: RenderPass) {
    pass.pipeline.onUse.on(u => {
       u.uTexture = this.fbos.read.colors[0]
    })
    this.passes.push(pass)
  }

  get(name: string) {
    return this.passes.find(pass => pass.name = name)
  }

  render(options: PostProcessRenderOption) {
    options = {
      enabled: true,
      ...options
    }

    if (!options.enabled || this.passes.length === 0) {
      options.render()
      return
    }

    let destination = this.fbos.write
    options.render(destination)
    this._swap()

    const len = this.passes.length
    for (let i = 0; i < len; i++) {
      destination = i === (len-1) ? options.target : this.fbos.write
      const { pipeline } = this.passes[i]

      this.renderer.render({
        target: destination,
        geometry: this.geometry,
        pipeline,
      })
      this._swap()
    }
  }

}