export interface SamplerDescription {
  times: Float32Array
  values: Float32Array
  type: "translation" | "rotation" | "scale" | "weights"
  interpolation: "LINEAR" | "STEP" | "CUBICSPLINE"
  minTime: number
  maxTime: number
}

export type SampledValue = Float32Array | number[]