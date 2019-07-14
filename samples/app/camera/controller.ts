import { mat4, quat, vec3 } from "gl-matrix";
import { Transform } from "fine/engine/Transform";

export class Orbit {

  private backup_matrix: mat4 = mat4.create()
  private backup_rotation: quat = quat.create()
  private backup_position: vec3 = vec3.create()

  private static V3 = vec3.fromValues(0,0,0)
  private static M4 = mat4.create()
  private static UP = vec3.fromValues(0,1,0)

  constructor(private transform: Transform, private target: Transform) {}

  start() {
    vec3.copy(this.backup_position, this.transform.localPosition)
    quat.copy(this.backup_rotation, this.transform.localRotation)
    mat4.copy(this.backup_matrix, this.transform.getMatrix())
  }

  update(x: number, y: number) {
    // Reset matrix
    this.transform.setMatrix( this.backup_matrix )

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

  stop() {}

}