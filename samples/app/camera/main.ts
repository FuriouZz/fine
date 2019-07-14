import { Sample } from "../sample";
import { Debug } from "fine/gl/debug/Debug";
import { PrimitiveMesh } from "fine/gl/primitives/Primitive";
import { GLPrimitive } from "fine/gl/constants/Types";
import { Mesh } from "fine/gl/Mesh";
import { Key } from "fine/inputs/Key";
import { quat, mat4, vec4, vec3, mat3 } from "gl-matrix";
import { Color } from "fine/engine/Color";
import { GL } from "fine/gl/constants/GL";
import { Orbit } from "./controller";

const M4 = mat4.create()

class CameraSample extends Sample {

  prim: Mesh
  target: Mesh
  ref: Mesh
  dir: Mesh

  coords = [0, 0]

  position = vec3.create()
  rotation = quat.create()


  // rotation = [0, 0, 0]
  angle = 0
  matrix = mat4.create()

  async onSetup() {
    const mouse = this.system.inputs.mouse
    const keyboard = this.system.inputs.key

    let pipeline = await Debug.pipeline(this.state, "Normal")

    this.prim = PrimitiveMesh.sphere(pipeline, 1, 10, 10)
    this.prim.geometry.drawMode = GLPrimitive.LINES
    this.root.addChild(this.prim.transform)

    pipeline = await Debug.pipeline(this.state, "Color")
    this.target = PrimitiveMesh.sphere(pipeline, 0.05, 10, 10)
    this.target.transform.translate(0, 0, 0)
    this.root.addChild(this.target.transform)

    pipeline = await Debug.pipeline(this.state, "Color", Color.Blue())
    this.ref = PrimitiveMesh.sphere(pipeline, 0.075, 10, 10)
    this.ref.transform.translate(0.5, 0.5, 0)
    this.root.addChild(this.ref.transform)

    // look at
    // mat4.targetTo(M4, this.ref.transform.localPosition, this.target.transform.localPosition, [0, 1, 0])
    // this.ref.transform.setMatrix(M4)

    pipeline = await Debug.pipeline(this.state, "Color", Color.Green())
    this.dir = PrimitiveMesh.sphere(pipeline, 0.075, 10, 10)
    this.dir.transform.translate(0, 0, -0.25)
    this.ref.transform.addChild(this.dir.transform)

    // this.ref = this.camera as unknown as Mesh

    const translation = vec3.create()
    const axisZ = vec3.create()
    const axisY = vec3.create()
    const axisX = vec3.create()
    // vec3.set(
    //   translation,
    //   this.target.transform.position[0] - this.ref.transform.position[0],
    //   this.target.transform.position[1] - this.ref.transform.position[1],
    //   this.target.transform.position[2] - this.ref.transform.position[2]
    // )

    const rotation = mat4.create()
    // quat.rotateZ(rotation, rotation, Math.PI * 0.5)

    // this.ref.transform.translate(translation[0], translation[1], translation[2])

    // vec3.transformQuat(translation, translation, rotation)
    // vec3.negate(translation, translation)

    // this.ref.transform.translate(translation[0], translation[1], translation[2])

    const orbit = new Orbit(this.camera.transform, this.target.transform)

    mouse.pressed.on((key) => {
      if (key.code == Key.MOUSE_RIGHT) {
        this.coords[0] = this.system.inputs.mouse.position.pixels[0]
        this.coords[1] = this.system.inputs.mouse.position.pixels[1]

        orbit.start()
      }
    })

    mouse.up.on((key) => {
      if (key.code == Key.MOUSE_RIGHT) {
        orbit.stop()
      }
    })

    mouse.down.on((key) => {
      if (key.code == Key.MOUSE_RIGHT) {

        orbit.update(
          (this.coords[0] - mouse.position.pixels[0]) * 0.01,
          (this.coords[1] - mouse.position.pixels[1]) * 0.01,
        )

        // // Reset matrix
        // this.ref.transform.setMatrix(this.matrix)

        // // Compute x axis after ref rotation
        // vec3.set(axisX, 1, 0, 0)
        // vec3.transformQuat(axisX, axisX, this.rotation)

        // // Compute rotation
        // mat4.identity(rotation)
        // mat4.rotate(rotation, rotation, (this.coords[1] - mouse.position.pixels[1]) * 0.01, axisX)
        // mat4.rotateY(rotation, rotation, (this.coords[0] - mouse.position.pixels[0]) * 0.01)

        // // // Apply rotation to the ref
        // // mat4.multiply(M4, this.matrix, rotation)
        // // this.ref.transform.setMatrix(M4)

        // // ORBIT
        // vec3.sub(translation, this.target.transform.localPosition, this.position)
        // this.ref.transform.translate(translation[0], translation[1], translation[2])
        // vec3.transformMat4(translation, translation, rotation)
        // vec3.negate(translation, translation)
        // this.ref.transform.translate(translation[0], translation[1], translation[2])

        // // Look at
        // mat4.targetTo(M4, this.ref.transform.localPosition, this.target.transform.localPosition, [0, 1, 0])
        // this.ref.transform.setMatrix(M4)
      }
    })

    this.play()
  }

  onResize() { }

  onUpdate() {
    this.prim.computeModelViewProjection(this.camera)
    this.ref.computeModelViewProjection(this.camera)
    this.dir.computeModelViewProjection(this.camera)
    this.target.computeModelViewProjection(this.camera)

    // // Look at
    // mat4.targetTo(M4, this.ref.transform.localPosition, this.target.transform.localPosition, [0, 1, 0])
    // this.ref.transform.setMatrix(M4)
  }

  onRender() {
    this.prim.render()
    this.target.render()
    this.ref.render()
    this.dir.render()

    // console.log(this.target.transform.localPosition, this.ref.transform.localPosition);

  }

  static main() {
    new CameraSample()
  }

}

CameraSample.main()