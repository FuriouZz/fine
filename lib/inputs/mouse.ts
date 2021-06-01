import { vec2 } from "gl-matrix";
import { List } from "lol/js/collections/list";
import { Dispatcher } from "lol/js/dispatcher";
import { MKey } from "inputs/key";
import { MouseKey } from "inputs/types";

export class MouseInput {

  private downPool = new List<MKey>()
  private keys: Record<number, MouseKey> = {}
  private width = 1
  private height = 1

  position = {
    pixels: vec2.fromValues(0, 0),
    normalized: vec2.fromValues(0, 0)
  }

  up = new Dispatcher<MouseKey>()
  down = new Dispatcher<MouseKey>()
  pressed = new Dispatcher<MouseKey>()
  move = new Dispatcher<MouseKey>()

  constructor() {
    this.onMouse = this.onMouse.bind(this)
  }

  enable($el: Element | Window) {
    $el.addEventListener('mouseup', this.onMouse)
    $el.addEventListener('mousedown', this.onMouse)
    $el.addEventListener('mousemove', this.onMouse)
  }

  disable($el: Element | Window) {
    $el.removeEventListener('mouseup', this.onMouse)
    $el.removeEventListener('mousedown', this.onMouse)
    $el.removeEventListener('mousemove', this.onMouse)
  }

  getKey(key: MKey) {
    return this.keys[key] = this.keys[key] || {
      code: key,
      key: MKey[key],
      up: true,
      down: false,
      pressed: false,
      pixels: this.position.pixels,
      normalized: this.position.normalized
    }
  }

  isUp(key: MKey) {
    return this.getKey(key).up
  }

  isDown(key: MKey) {
    return this.getKey(key).down
  }

  isPressed(key: MKey) {
    return this.getKey(key).pressed
  }

  private onMouse(e: MouseEvent) {
    const mouse: MouseKey = this.getKey(e.button)

    this.position.pixels[0] = e.clientX
    this.position.pixels[1] = e.clientY
    this.computeNormalizedPosition()

    mouse.pixels = this.position.pixels
    mouse.normalized = this.position.normalized

    if (e.type == "mouseup") {
      mouse.up = true
      mouse.down = false
      mouse.pressed = false
      this.up.dispatch(mouse)

      this.downPool.remove(mouse.code)
    }

    else if (e.type == "mousedown") {
      mouse.up = false
      mouse.down = true
      mouse.pressed = true

      this.pressed.dispatch(mouse)
      this.downPool.push(mouse.code)
    }

    else if (e.type == "mousemove") {
      this.move.dispatch(mouse)
    }
  }

  update() {
    for (const key of this.downPool) {
      const keyObject = this.keys[key]
      if (keyObject) {
        keyObject.pressed = false
        this.down.dispatch(keyObject)
      }
    }
  }

  resize(width: number, height: number) {
    this.width = width || 1
    this.height = height || 1
  }

  computeNormalizedPosition() {
    this.position.normalized[0] = this.position.pixels[0] / this.width
    this.position.normalized[1] = this.position.pixels[1] / this.height
  }

}