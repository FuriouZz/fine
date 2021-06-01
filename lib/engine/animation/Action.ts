import { MeshSampler } from "engine/animation/MeshSampler"
import { TransformSampler } from "engine/animation/TransformSampler"

export default class Action {
  samplers: (TransformSampler|MeshSampler)[] = []
  elapsedTime = 0
  currentTime = 0
  minTime = 0
  maxTime = 0
  speed = 1

  running = false
  loop = true
  alternate = true

  name = "Action"
  duration = 0

  constructor() {
    this.duration = this.maxTime - this.minTime
  }

  get progress() {
    return this.currentTime / this.duration
  }

  reset() {
    this.elapsedTime = 0
    this.currentTime = 0
  }

  play() {
    if (this.running) return this
    this.elapsedTime = 0
    this.resume()
    return this
  }

  resume() {
    if (this.running) return this
    this.running = true
    return this
  }

  stop() {
    if (!this.running) return this
    this.pause()
    this.elapsedTime = 0
    return this
  }

  pause() {
    if (!this.running) return this
    this.running = false
    return this
  }

  update(dt: number) {
    if (!this.running) return
    this.elapsedTime += dt
    this._update()
  }

  protected _update() {
    this.currentTime = this.elapsedTime * this.speed

    if (this.elapsedTime > this.maxTime && this.alternate) {
      this.currentTime = this.maxTime + this.duration - (this.elapsedTime - this.maxTime)
    }

    if (this.alternate && this.currentTime < 0) {
      if (this.loop) {
        this.currentTime = this.minTime + Math.abs(this.currentTime)
        this.elapsedTime = this.currentTime
      } else {
        this.stop()
      }
    } else if (!this.alternate && this.currentTime > this.maxTime) {
      if (this.loop) {
        this.currentTime = this.minTime + this.currentTime - this.maxTime
        this.elapsedTime = this.currentTime
      } else {
        this.stop()
      }
    }

    if (this.samplers.length > 0) {
      for (let i = 0; i < this.samplers.length; i++) {
        this.samplers[i].update(this.currentTime)
      }
    }
  }

  set(progress: number) {
    this.elapsedTime = this.minTime + (this.maxTime - this.minTime) * progress
    this._update()
    return this
  }

}