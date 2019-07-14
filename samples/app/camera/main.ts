import { Sample } from "../sample";
import { Debug } from "fine/gl/debug/Debug";
import { PrimitiveMesh } from "fine/gl/primitives/Primitive";
import { GLPrimitive } from "fine/gl/constants/Types";
import { Mesh } from "fine/gl/Mesh";
import { Key } from "fine/inputs/Key";
import { quat, mat4, vec4, vec3, mat3 } from "gl-matrix";
import { Color } from "fine/engine/Color";
import { GL } from "fine/gl/constants/GL";

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
    this.ref.transform.translate(0, 0, 1)
    this.root.addChild(this.ref.transform)

    pipeline = await Debug.pipeline(this.state, "Color", Color.Green())
    this.dir = PrimitiveMesh.sphere(pipeline, 0.075, 10, 10)
    this.dir.transform.translate(0, 0, -0.25)
    this.ref.transform.addChild(this.dir.transform)

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

    mouse.pressed.on((key) => {
      if (key.code == Key.MOUSE_RIGHT) {
        this.coords[0] = this.system.inputs.mouse.position.pixels[0]
        this.coords[1] = this.system.inputs.mouse.position.pixels[1]
        vec3.copy(this.position, this.ref.transform.localPosition)
        quat.copy(this.rotation, this.ref.transform.localRotation)
        mat4.copy(this.matrix, this.ref.transform.getMatrix())
      }
    })

    mouse.up.on((key) => {
      if (key.code == Key.MOUSE_RIGHT) {
        console.log("UP", this.ref.transform.localRotation)
      }
    })

    mouse.down.on((key) => {
      if (key.code == Key.MOUSE_RIGHT) {

        // Reset matrix
        this.ref.transform.setMatrix(this.matrix)

        // Compute x axis after ref rotation
        vec3.set(axisX, 1, 0, 0)
        vec3.transformQuat(axisX, axisX, this.rotation)

        // Compute rotation
        mat4.identity(rotation)
        mat4.rotate(rotation, rotation, (this.coords[1] - mouse.position.pixels[1]) * 0.01, axisX)
        mat4.rotateY(rotation, rotation, (this.coords[0] - mouse.position.pixels[0]) * 0.01)

        // Apply rotation to the ref
        mat4.multiply(M4, this.matrix, rotation)
        this.ref.transform.setMatrix(M4)


        // ORBIT
        vec3.set(
          translation,
          this.target.transform.localPosition[0] - this.position[0],
          this.target.transform.localPosition[1] - this.position[1],
          this.target.transform.localPosition[2] - this.position[2]
        )
        this.ref.transform.translate(translation[0], translation[1], translation[2])

        vec3.transformMat4(translation, translation, rotation)

        vec3.negate(translation, translation)
        this.ref.transform.translate(translation[0], translation[1], translation[2])

        // this.ref.transform.getUp(axisY)
        // this.ref.transform.getRight(axisX)
        // this.ref.transform.getForward( axisZ )

        // quat.identity(rotation)
        // quat.setAxes(rotation, axisZ, axisX, axisY)
        // quat.rotateX(rotation, rotation, (this.coords[1] - mouse.position.pixels[1]) * 0.01)
        // console.log(rotation)
        // quat.add(this.ref.transform.localRotation, this.ref.transform.localRotation, rotation)

        // this.ref.transform.rotateY((this.coords[0] - mouse.position.pixels[0]) * 0.01)
        // this.ref.transform.invalidate()

        // mat3.rotate(rotation, rotation, )
        // mat4.identity(rotation)
        // mat4.fromQuat(rotation, this.rotation)
        // mat4.rotateY(rotation, rotation, 0.001)//(this.coords[1] - mouse.position.pixels[1]) * 0.01)
        // mat4.rotate(rotation, rotation, (this.coords[1] - mouse.position.pixels[1]) * 0.01, axisX)


        // mat4.multiply(rotation, this.matrix, rotation)
        // this.ref.transform.setMatrix(rotation)
        // this.ref.transform.invalidate()

        // this.ref.transform.setRotation(axisX, (this.coords[1] - mouse.position.pixels[1]) * 0.01 )

        // // const axisX = vec3.create()
        // // const up = [0, 1, 0]
        // // const axisY = vec3.create()
        // // const axisZ = vec3.create()

        // // this.ref.transform.getUp( axisY )
        // // vec3.cross(axisX, axisZ, up)
        // // vec3.normalize(axisX, axisX)

        // // console.log(axisY);

        // // vec3.set(
        // //   axisX,
        // //   1 - Math.abs(axis[0]),
        // //   1 - Math.abs(axis[1]),
        // //   1 - Math.abs(axis[2]),
        // // )
        // // vec3.set(axisY, 0, axisX[1], 0)
        // // vec3.set(axisZ, 0, 0, axisX[2])
        // // vec3.set(axisX, axisX[0], 0, 0)
        // // // vec3.cross(axisX, axisX, axis)
        // // // vec3.cross(axisX, axisY, axisZ)

        // vec3.copy(this.ref.transform.localPosition, this.position)
        // this.ref.transform.translate(translation[0], translation[1], translation[2])

        // const m = mat4.create()
        // mat4.identity(m)
        // mat4.rotate(m, m, (this.coords[0] - mouse.position.pixels[0]) * 0.01, axisY)

        // // quat.setAxisAngle(rotation, axisX, (this.coords[1] - mouse.position.pixels[1]) * 0.01)
        // // quat.rotateY(rotation, rotation, (this.coords[0] - mouse.position.pixels[0]) * 0.01)

        // this.ref.transform.setRotation(axisX, (this.coords[1] - mouse.position.pixels[1]) * 0.01 )
        // // this.ref.transform.rotateY((this.coords[0] - mouse.position.pixels[0]) * 0.01)

        // // mat4.rotateY(m, m, (this.coords[0] - mouse.position.pixels[0]) * 0.01)
        // // mat4.rotate(m, m, (this.coords[1] - mouse.position.pixels[1]) * 0.01, axisX)

        // // mat4.rotate(m, m, (this.coords[0] - mouse.position.pixels[0]) * 0.01, axisY)
        // // mat4.rotate(m, m, (this.coords[1] - mouse.position.pixels[1]) * 0.01, axisZ)

        // // quat.identity(rotation)


        // // quat.rotateZ(rotation, rotation, (this.coords[1] - mouse.position.pixels[1]) * 0.01)
        // // quat.setAxisAngle(rotation, axis, (this.coords[1] - mouse.position.pixels[1]) * 0.01)


        // // vec3.transformQuat(translation, translation, rotation)
        // vec3.transformMat4(translation, translation, m)
        // vec3.negate(translation, translation)

        // this.ref.transform.translate(translation[0], translation[1], translation[2])

        // // console.log(this.ref.transform.localPosition);

      }
    })

    // mouse.pressed.on((key) => {
    //   if (key.code == Key.MOUSE_RIGHT && keybrd.getKey(Key.SHIFT).down) {
    //     this.pan[0] = this.system.inputs.mouse.position.pixels[0]
    //     this.pan[1] = this.system.inputs.mouse.position.pixels[1]
    //     this.position[0] = this.camera.transform.position[0]
    //     this.position[1] = this.camera.transform.position[1]
    //     this.position[2] = this.camera.transform.position[2]
    //   } else if (key.code == Key.MOUSE_RIGHT) {
    //     this.pan[0] = this.system.inputs.mouse.position.pixels[0]
    //     this.pan[1] = this.system.inputs.mouse.position.pixels[1]
    //     this.angle = quat.getAxisAngle(this.rotation, this.target.transform.rotation)
    //     mat4.copy( this.matrix, this.camera.transform.getMatrix() )
    //     console.log('pressed?');

    //   }
    // })

    // mouse.down.on((key) => {
    //   if (key.code == Key.MOUSE_RIGHT && keybrd.getKey(Key.SHIFT).down) {
    //     // this.camera.transform.position[0] = this.position[0] + (this.pan[0] - mouse.position.pixels[0]) * 0.01
    //     // this.camera.transform.position[1] = this.position[1] + (this.pan[1] - mouse.position.pixels[1]) * 0.01
    //     // this.camera.transform.position[2] = this.position[2]
    //     // this.camera.transform.invalidate()
    //   } else if (key.code == Key.MOUSE_RIGHT) {

    //     // this.target.transform.setRotation(this.rotation, this.angle + (this.pan[1] - mouse.position.pixels[1]) * 0.001)

    //     // const matrix = mat4.create()
    //     // mat4.mul( matrix, this.matrix, this.target.transform.getMatrix() )
    //     // this.camera.transform.setMatrix( matrix )

    //     // console.log(this.target.transform.getMatrix());


    //     const x = this.camera.transform.position[0] - this.target.transform.position[0]
    //     const y = this.camera.transform.position[1] - this.target.transform.position[1]
    //     const z = this.camera.transform.position[2] - this.target.transform.position[2]

    //     const v = vec3.set(vec3.create(), x, y, z)

    //     const matrix = mat4.copy(mat4.create(), this.matrix)
    //     mat4.translate( matrix, matrix, v)
    //     mat4.rotate(matrix, matrix, this.angle + (this.pan[1] - mouse.position.pixels[1]) * 0.0001, this.rotation)

    //     vec3.transformMat4(v, v, matrix)

    //     mat4.translate( matrix, matrix, vec3.negate(v, v))
    //     this.camera.transform.setMatrix( matrix )
    //     // this.camera.transform.setRotation(this.rotation, this.angle + (this.pan[1] - mouse.position.pixels[1]) * 0.001)
    //     // this.camera.transform.setScale(this.target.transform.scale[0], this.target.transform.scale[1], this.target.transform.scale[2])
    //     // this.camera.transform.setPosition(-x, -y, -z)

    //     // this.target.transform.rotation

    //   }
    // })

    this.play()
  }

  onResize() { }

  onUpdate() {
    this.prim.computeModelViewProjection(this.camera)
    this.ref.computeModelViewProjection(this.camera)
    this.dir.computeModelViewProjection(this.camera)
    this.target.computeModelViewProjection(this.camera)
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