import { Sample } from "../sample";
import { Debug } from "fine/gl/debug/Debug";
import { PrimitiveMesh } from "fine/gl/primitives/Primitive";
import { GLPrimitive } from "fine/gl/constants/Types";
import { Mesh } from "fine/gl/Mesh";
import { Color } from "fine/engine/Color";
import { CameraController } from "./CameraController";

class CameraSample extends Sample {

  renderables: Mesh[] = []

  async onSetup() {
    let pipeline = await Debug.pipeline(this.state, "Normal")

    const prim = PrimitiveMesh.sphere(pipeline, 1, 10, 10)
    prim.geometry.drawMode = GLPrimitive.LINES
    this.root.addChild(prim.transform)
    this.renderables.push( prim )

    pipeline = await Debug.pipeline(this.state, "Color")
    const target = PrimitiveMesh.sphere(pipeline, 0.05, 10, 10)
    target.transform.translate(0, 0, 0)
    this.root.addChild(target.transform)
    this.renderables.push( target )

    pipeline = await Debug.pipeline(this.state, "Color", Color.Blue())
    const ref = PrimitiveMesh.sphere(pipeline, 0.075, 10, 10)
    ref.transform.translate(0.5, 0.5, 0)
    this.root.addChild(ref.transform)
    this.renderables.push( ref )

    pipeline = await Debug.pipeline(this.state, "Color", Color.Green())
    const dir = PrimitiveMesh.sphere(pipeline, 0.075, 10, 10)
    dir.transform.translate(0, 0, -0.25)
    ref.transform.addChild(dir.transform)
    this.renderables.push( dir )

    // Create camera controller
    new CameraController(this.system, this.camera.transform, target.transform)

    this.play()
  }

  onResize() { }

  onUpdate() {
    for (let i = 0; i < this.renderables.length; i++) {
      const renderable = this.renderables[i];
      renderable.computeModelViewProjection( this.camera )
    }

    // // Look at
    // mat4.targetTo(M4, this.ref.transform.localPosition, this.target.transform.localPosition, [0, 1, 0])
    // this.ref.transform.setMatrix(M4)
  }

  onRender() {
    for (let i = 0; i < this.renderables.length; i++) {
      const renderable = this.renderables[i];
      renderable.render()
    }
  }

  static main() {
    new CameraSample()
  }

}

CameraSample.main()