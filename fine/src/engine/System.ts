import { Dispatcher } from "../utils/Dispatcher";
import { Inputs } from "../inputs/Inputs";

export class System {

  size = new Float32Array([ 0, 0 ])
  pixelRatio = 1

  resize = new Dispatcher<Float32Array>()

  paused = true
  update = new Dispatcher()
  render = new Dispatcher()

  deltaTime = 0
  playTime = 0
  previousTime = 0
  timeScale = 1

  inputs = new Inputs()

  constructor() {
    this._RAF = this._RAF.bind(this)
    this._onResize = this._onResize.bind(this)
    this.enable()
  }

  get currentTime() {
    return window.performance.now() / 1000
  }

  enable() {
    this._onResize()
    window.addEventListener('resize', this._onResize)
    this.paused = false
    window.requestAnimationFrame(this._RAF)
  }

  disable() {
    window.removeEventListener('resize', this._onResize)
    this.paused = true
  }

  private _onResize() {
    this.size[0] = window.innerWidth
    this.size[1] = window.innerHeight
    this.pixelRatio = window.devicePixelRatio
    this.inputs.resize(this.size[0], this.size[1])
    this.resize.dispatch(this.size)
  }

  private _RAF() {
    if (this.paused) return

    const currentTime = this.currentTime
    this.deltaTime = (currentTime - this.previousTime) * this.timeScale
    this.previousTime = currentTime
    this.playTime += this.deltaTime

    this.inputs.update()
    this.update.dispatch()
    this.render.dispatch()

    window.requestAnimationFrame(this._RAF)
  }

}