import { SampledValue, SamplerDescription } from "engine/animation/Types"

export default class Sampler {
  size = 0

  constructor(public options: SamplerDescription) {
    switch (this.options.type) {
      case "scale":
      case "translation":
        {
          this.size = 3
          break
        }
      case "rotation":
        {
          this.size = 4
          break
        }
      case "weights":
        {
          this.size = 1
          break
        }
    }
  }

  pick(t: number, out?: SampledValue) {
    let i0: number = 0
    let i1: number = 0
    let tt = 0

    if (t > this.options.maxTime) {
      i0 = i1 = this.options.times.length-1
    }

    else if (t < this.options.minTime) {
      i0 = i1 = 0
    }

    else {
      const len = this.options.times.length - 1
      for (let i = 0; i < len; i++) {
        i0 = i
        i1 = i+1

        if (t >= this.options.times[i0] && t <= this.options.times[i1]) {
          tt = (t - this.options.times[i0]) / (this.options.times[i1] - this.options.times[i0])
          break
        }
      }
    }

    return this.interpolate(out, t, i0, i1)
  }

  pickValue(t: number) {
    if (this.options.type === "weights") {
      return this.pick(t) as number
    }
    throw new Error(`Cannot pick a value for type "${this.options.type}". Use pickValues(t: number, out: Float32Array) instead.`)
  }

  pickValues(t: number, out: SampledValue) {
    if (this.options.type !== "weights") {
      return this.pick(t, out) as SampledValue
    }
    throw new Error(`Cannot pick values for type "${this.options.type}". Use pickValue(t: number) instead.`)
  }

  interpolate(out: SampledValue, t: number, fromIndex: number, toIndex: number) {
    const from = this.options.values.slice(fromIndex*this.size, fromIndex*this.size+this.size)
    const to = this.options.values.slice(toIndex*this.size, toIndex*this.size+this.size)

    if (this.options.interpolation === "LINEAR") {
      if (this.size === 1) {
        return from[0] + (to[0] - from[0]) * t
      }

      for (let i = 0; i < this.size; i++) {
        out[i] = from[i] + (to[i] - from[i]) * t
      }
    } else if (this.options.interpolation === "STEP") {
      if (this.size === 1) {
        return from[0]// + (to[0] - from[0]) * t
      }

      for (let i = 0; i < this.size; i++) {
        out[i] = from[i]// + (to[i] - from[i]) * t
      }
    }

    return out
  }
}