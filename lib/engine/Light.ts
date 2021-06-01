import Color from "engine/Color";
import Transform from "engine/Transform";

export default class Light {
  transform = new Transform()
  color = Color.White()
  type = "point"

  get name() {
    return this.transform.name
  }

  set name(value: string) {
    this.transform.name = value
  }

  static isPointLight(l: Light): l is PointLight {
    return l.type === "point"
  }
}

export class PointLight extends Light {
  cutOffDistance = 1
  decayExponent = 1
  type = "point"
}