import { Sample } from "../sample";
import { Debug } from "fine/gl/debug/Debug";
import { PrimitiveMesh } from "fine/gl/primitives/Primitive";
import { GLPrimitive } from "fine/gl/constants/Types";
import { Mesh } from "fine/gl/Mesh";
import { Key } from "fine/inputs/Key";
import { quat, mat4, vec4, vec3 } from "gl-matrix";

class CameraSample extends Sample {

  prim: Mesh
  target: Mesh

  pan = [0, 0]
  position = [0, 0, 0]
  rotation = [0, 0, 0]
  angle = 0
  matrix = mat4.create()

  async onSetup() {
    let pipeline = await Debug.pipeline(this.state, "Normal")

    this.prim = PrimitiveMesh.sphere(pipeline, 1, 10, 10)
    this.prim.geometry.drawMode = GLPrimitive.LINES
    this.root.addChild( this.prim.transform )

    pipeline = await Debug.pipeline(this.state, "Color")
    this.target = PrimitiveMesh.sphere(pipeline, 0.05, 10, 10)
    this.target.transform.translate(0, 0, 0)
    this.root.addChild( this.target.transform )

    const mouse = this.system.inputs.mouse
    const keybrd = this.system.inputs.key

    mouse.pressed.on((key) => {
      if (key.code == Key.MOUSE_RIGHT && keybrd.getKey(Key.SHIFT).down) {
        this.pan[0] = this.system.inputs.mouse.position.pixels[0]
        this.pan[1] = this.system.inputs.mouse.position.pixels[1]
        this.position[0] = this.camera.transform.position[0]
        this.position[1] = this.camera.transform.position[1]
        this.position[2] = this.camera.transform.position[2]
      } else if (key.code == Key.MOUSE_RIGHT) {
        this.pan[0] = this.system.inputs.mouse.position.pixels[0]
        this.pan[1] = this.system.inputs.mouse.position.pixels[1]
        this.angle = quat.getAxisAngle(this.rotation, this.target.transform.rotation)
        mat4.copy( this.matrix, this.camera.transform.getMatrix() )
        console.log('pressed?');

      }
    })

    mouse.down.on((key) => {
      if (key.code == Key.MOUSE_RIGHT && keybrd.getKey(Key.SHIFT).down) {
        // this.camera.transform.position[0] = this.position[0] + (this.pan[0] - mouse.position.pixels[0]) * 0.01
        // this.camera.transform.position[1] = this.position[1] + (this.pan[1] - mouse.position.pixels[1]) * 0.01
        // this.camera.transform.position[2] = this.position[2]
        // this.camera.transform.invalidate()
      } else if (key.code == Key.MOUSE_RIGHT) {

        // this.target.transform.setRotation(this.rotation, this.angle + (this.pan[1] - mouse.position.pixels[1]) * 0.001)

        // const matrix = mat4.create()
        // mat4.mul( matrix, this.matrix, this.target.transform.getMatrix() )
        // this.camera.transform.setMatrix( matrix )

        // console.log(this.target.transform.getMatrix());


        const x = this.camera.transform.position[0] - this.target.transform.position[0]
        const y = this.camera.transform.position[1] - this.target.transform.position[1]
        const z = this.camera.transform.position[2] - this.target.transform.position[2]

        const v = vec3.set(vec3.create(), x, y, z)

        const matrix = mat4.copy(mat4.create(), this.matrix)
        mat4.translate( matrix, matrix, v)
        mat4.rotate(matrix, matrix, this.angle + (this.pan[1] - mouse.position.pixels[1]) * 0.0001, this.rotation)

        vec3.transformMat4(v, v, matrix)

        mat4.translate( matrix, matrix, vec3.negate(v, v))
        this.camera.transform.setMatrix( matrix )
        // this.camera.transform.setRotation(this.rotation, this.angle + (this.pan[1] - mouse.position.pixels[1]) * 0.001)
        // this.camera.transform.setScale(this.target.transform.scale[0], this.target.transform.scale[1], this.target.transform.scale[2])
        // this.camera.transform.setPosition(-x, -y, -z)

        // this.target.transform.rotation

      }
    })

    this.play()
  }

  onResize() {}

  onUpdate() {
    this.prim.computeModelViewProjection( this.camera )
    this.target.computeModelViewProjection( this.camera )
  }

  onRender() {
    this.prim.render()
    this.target.render()
  }

  static main() {
    new CameraSample()
  }

}

CameraSample.main()