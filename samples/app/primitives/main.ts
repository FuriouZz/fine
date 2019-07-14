import { Sample } from "../sample";
import { Debug } from "fine/gl/debug/Debug";
import { PrimitiveMesh } from "fine/gl/primitives/Primitive";
import { GLPrimitive } from "fine/gl/constants/Types";
import { Mesh } from "fine/gl/Mesh";
import { Key } from "fine/inputs/Key";

class PrimitiveSample extends Sample {

  prim: Mesh

  async onSetup() {
    const pipeline = await Debug.pipeline(this.state, "Normal")

    this.prim = PrimitiveMesh.sphere(pipeline, 1, 10, 10)
    this.prim.geometry.drawMode = GLPrimitive.LINES
    this.prim.geometry.drawMode = GLPrimitive.TRIANGLES
    this.root.addChild( this.prim.transform )

    this.play()
  }

  onResize() {}

  onUpdate() {
    this.prim.computeModelViewProjection( this.camera )
  }

  onRender() {
    this.prim.render()
  }

  static main() {
    new PrimitiveSample()
  }

}

PrimitiveSample.main()