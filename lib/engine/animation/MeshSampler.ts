import Mesh from "engine/Mesh"
import Sampler from "engine/animation/Sampler"

export class MeshSampler extends Sampler {
  mesh: Mesh

  update(t: number) {
    switch (this.options.type) {
      case "translation":
        {
          this.pickValues(t, this.mesh.transform.positionValues)
          this.mesh.transform.invalidate()
          break
        }
      case "rotation":
        {
          this.pickValues(t, this.mesh.transform.rotationValues)
          this.mesh.transform.invalidate()
          break
        }
      case "scale":
        {
          this.pickValues(t, this.mesh.transform.scaleValues)
          this.mesh.transform.invalidate()
          break
        }
      case "weights":
        {
          this.mesh.morph.weight = this.pickValue(t)
          break
        }
    }
  }
}