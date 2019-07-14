import { Orbit, Pan, Zoom } from "./Controllers";
import { vec2 } from "gl-matrix";
import { Inputs } from "fine/inputs/Inputs";
import { Transform } from "fine/engine/Transform";
import { Key } from "fine/inputs/Key";
import { System } from "fine/engine/System";

export type ControlType = "none" | "orbit" | "pan" | "zoom"

export class CameraController {

  orbit: Orbit
  pan: Pan
  zoom: Zoom

  mouse_position = vec2.fromValues(0, 0)

  running = false
  enabled = false

  control: ControlType = "none"

  constructor(private system: System, private transform: Transform, private target: Transform, ) {
    this.update = this.update.bind(this)

    this.orbit = new Orbit(this.transform, this.target)
    this.pan = new Pan(this.transform, this.target)
    this.zoom = new Zoom(this.transform, this.target)

    this.enable()
  }

  enable() {
    if (this.enabled) return
    this.enabled = true

    this.system.render.on(this.update)
  }

  disable() {
    if (!this.enabled) return
    this.enabled = false

    this.system.render.off(this.update)
  }

  get mouse() {
    return this.system.inputs.mouse
  }

  get kbrd() {
    return this.system.inputs.key
  }

  get mouseX() {
    return (this.mouse_position[0] - this.mouse.position.pixels[0]) * 0.01
  }

  get mouseY() {
    return (this.mouse_position[1] - this.mouse.position.pixels[1]) * 0.01
  }

  start(type: ControlType) {
    if (this.running) return
    this.running = true

    vec2.copy(this.mouse_position, this.mouse.position.pixels)

    if (type == "orbit") this.orbit.start()
    else if (type == "pan") this.pan.start()
    else if (type == "zoom") this.zoom.start()

    this.control = type
  }

  stop() {
    this.running = false

    if (this.control == "orbit") this.orbit.stop()
    if (this.control == "pan") this.pan.stop()
    if (this.control == "zoom") this.zoom.stop()

    this.control = "none"
  }

  update() {

    if (this.control == "none" && this.mouse.getKey(Key.MOUSE_MIDDLE).down && this.kbrd.getKey(Key.SHIFT).down) {
      this.start("pan")
    } else if (this.control == "pan" && this.mouse.getKey(Key.MOUSE_MIDDLE).down && this.kbrd.getKey(Key.SHIFT).down) {
      this.pan.update(this.mouseX, this.mouseY)
    } else if (this.control == "pan") {
      this.stop()
    }

    if (this.control == "none" && this.mouse.getKey(Key.MOUSE_MIDDLE).down && this.kbrd.getKey(Key.CTRL).down) {
      this.start("zoom")
    } else if (this.control == "zoom" && this.mouse.getKey(Key.MOUSE_MIDDLE).down && this.kbrd.getKey(Key.CTRL).down) {
      this.zoom.update(this.mouseY)
    } else if (this.control == "zoom") {
      this.stop()
    }

    if (this.control == "none" && this.mouse.getKey(Key.MOUSE_MIDDLE).down) {
      this.start("orbit")
    } else if (this.control == "orbit" && this.mouse.getKey(Key.MOUSE_MIDDLE).down) {
      this.orbit.update(this.mouseX, this.mouseY)
    } else if (this.control == "orbit") {
      this.stop()
    }

  }

}