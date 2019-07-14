import { mat4, quat, vec3, vec2 } from "gl-matrix";
import { Transform } from "fine/engine/Transform";
import { Inputs } from "fine/inputs/Inputs";
import { MouseKey } from "fine/inputs/Mouse";
import { Key } from "fine/inputs/Key";
import { KeyboardKey } from "fine/inputs/Keyboard";

export class Orbit {

  private backup_matrix: mat4 = mat4.create()
  private backup_rotation: quat = quat.create()
  private backup_position: vec3 = vec3.create()
  private running = false

  private static V3 = vec3.fromValues(0, 0, 0)
  private static M4 = mat4.create()
  private static UP = vec3.fromValues(0, 1, 0)

  constructor(private transform: Transform, private target: Transform) { }

  start() {
    if (this.running) return
    this.running = true

    vec3.copy(this.backup_position, this.transform.localPosition)
    quat.copy(this.backup_rotation, this.transform.localRotation)
    mat4.copy(this.backup_matrix, this.transform.getMatrix())
  }

  stop() {
    this.running = false
  }

  update(x: number, y: number) {
    // Reset matrix
    this.transform.setMatrix(this.backup_matrix)

    // Compute x axis after ref rotation (TODO: Need enhancement)
    vec3.set(Orbit.V3, 1, 0, 0)
    vec3.transformQuat(Orbit.V3, Orbit.V3, this.backup_rotation)

    // Compute rotation
    mat4.identity(Orbit.M4)
    mat4.rotate(Orbit.M4, Orbit.M4, y, Orbit.V3)
    mat4.rotateY(Orbit.M4, Orbit.M4, x)

    // Compute direction
    vec3.sub(Orbit.V3, this.target.localPosition, this.backup_position)

    // Move to target
    vec3.add(this.transform.localPosition, this.transform.localPosition, Orbit.V3)

    // Rotate direction
    vec3.transformMat4(Orbit.V3, Orbit.V3, Orbit.M4)

    // Inverse direction
    vec3.negate(Orbit.V3, Orbit.V3)

    // Move to new position
    vec3.add(this.transform.localPosition, this.transform.localPosition, Orbit.V3)

    // Look at the target
    mat4.targetTo(Orbit.M4, this.transform.localPosition, this.target.localPosition, Orbit.UP)
    this.transform.setMatrix(Orbit.M4)
    this.transform.invalidate()
  }

}

export class Pan {

  private backup_matrix: mat4 = mat4.create()
  private backup_target_matrix: mat4 = mat4.create()
  private running = false

  private static V3 = vec3.fromValues(0, 0, 0)

  constructor(private transform: Transform, private target: Transform) { }

  start() {
    if (this.running) return
    this.running = true

    mat4.copy(this.backup_matrix, this.transform.getMatrix())
    mat4.copy(this.backup_target_matrix, this.target.getMatrix())
  }

  stop() {
    this.running = false
  }

  update(x: number, y: number) {
    // Reset matrix
    this.target.setMatrix(this.backup_target_matrix)
    this.transform.setMatrix(this.backup_matrix)

    this.transform.getRight(Pan.V3)
    vec3.scaleAndAdd(this.transform.localPosition, this.transform.localPosition, Pan.V3, x)
    vec3.scaleAndAdd(this.target.localPosition, this.target.localPosition, Pan.V3, x)

    this.transform.getUp(Pan.V3)
    vec3.scaleAndAdd(this.transform.localPosition, this.transform.localPosition, Pan.V3, -y)
    vec3.scaleAndAdd(this.target.localPosition, this.target.localPosition, Pan.V3, -y)

    this.transform.invalidate()
    this.target.invalidate()
  }

}

export class Zoom {

  minDistance = 2

  private backup_matrix: mat4 = mat4.create()
  private running = false

  private static V0 = vec3.fromValues(0, 0, 0)
  private static V1 = vec3.fromValues(0, 0, 0)
  private static V2 = vec3.fromValues(0, 0, 0)

  constructor(private transform: Transform, private target: Transform) { }

  start() {
    if (this.running) return
    this.running = true

    mat4.copy(this.backup_matrix, this.transform.getMatrix())
  }

  stop() {
    this.running = false
  }

  update(y: number) {
    // Reset matrix
    this.transform.setMatrix(this.backup_matrix)

    // Compute min vector
    vec3.sub(Zoom.V0, this.transform.localPosition, this.target.localPosition)
    vec3.normalize(Zoom.V0, Zoom.V0)
    vec3.scale(Zoom.V0, Zoom.V0, this.minDistance)

    // Move transform
    this.transform.getForward(Zoom.V1)
    vec3.scaleAndAdd(this.transform.localPosition, this.transform.localPosition, Zoom.V1, y)

    // Detect when around min vector
    vec3.sub(Zoom.V2, this.transform.localPosition, Zoom.V0)
    vec3.normalize(Zoom.V2, Zoom.V2)
    vec3.sub(Zoom.V2, Zoom.V2, Zoom.V1)

    // Move to difference
    if (vec3.length(Zoom.V2) == 0) {
      vec3.sub(Zoom.V2, this.transform.localPosition, Zoom.V0)
      vec3.negate(Zoom.V2, Zoom.V2)
      vec3.add(this.transform.localPosition, this.transform.localPosition, Zoom.V2)
    }

    this.transform.invalidate()
  }

}