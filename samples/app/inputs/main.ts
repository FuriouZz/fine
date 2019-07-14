import { Sample } from "../sample";
import { Debug } from "fine/gl/debug/Debug";
import { PrimitiveMesh } from "fine/gl/primitives/Primitive";
import { GLPrimitive } from "fine/gl/constants/Types";
import { Mesh } from "fine/gl/Mesh";
import { Key } from "fine/inputs/Key";

class InputsSample extends Sample {

  prim: Mesh
  speed = 0

  async onSetup() {
    const pipeline = await Debug.pipeline(this.state, "Normal")

    this.prim = PrimitiveMesh.sphere(pipeline, 1, 10, 10)
    this.prim.geometry.drawMode = GLPrimitive.LINES
    this.prim.geometry.drawMode = GLPrimitive.TRIANGLES
    this.root.addChild( this.prim.transform )

    this.system.inputs.key.down.on((key) => {
      if (key.code == Key.LEFT) {
        this.speed -= 0.1
      }
      else if (key.code == Key.RIGHT) {
        this.speed += 0.1
      }
    })

    this.system.inputs.key.up.on((key) => {
      if (key.code == Key.LEFT || key.code == Key.RIGHT) {
        this.speed = 0
      }
    })

    this.play()
  }

  onResize() {}

  onUpdate() {
    if (this.system.inputs.key.getKey(Key.UP).down) {
      this.prim.transform.rotateX(-this.system.deltaTime)
    } else if (this.system.inputs.key.getKey(Key.DOWN).down) {
      this.prim.transform.rotateX(this.system.deltaTime)
    }

    this.prim.transform.translate(this.speed * this.system.deltaTime, 0, 0)
    this.prim.computeModelViewProjection( this.camera )
  }

  onRender() {
    this.prim.render()
  }

  static main() {
    new InputsSample()
  }

}

InputsSample.main()