import Sampler from "engine/animation/Sampler";
import Transform from "engine/Transform";

export class TransformSampler extends Sampler {
  transform: Transform

  update(t: number) {
    switch (this.options.type) {
      case "translation":
        {
          this.pickValues(t, this.transform.positionValues)
          this.transform.invalidate()
          break
        }
      case "rotation":
        {
          this.pickValues(t, this.transform.rotationValues)
          this.transform.invalidate()
          break
        }
      case "scale":
        {
          this.pickValues(t, this.transform.scaleValues)
          this.transform.invalidate()
          break
        }
    }
  }
}