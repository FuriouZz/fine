import { Key } from "inputs/key";
import { List } from "lol/js/collections/list";
import { Dispatcher } from "lol/js/dispatcher";
import { TouchKey } from "inputs/types";

export class TouchInput {

  private downPool = new List<Key>()
  private keys: Record<number, TouchKey> = {}
  private width = 1
  private height = 1

  up = new Dispatcher<TouchKey>()
  down = new Dispatcher<TouchKey>()
  pressed = new Dispatcher<TouchKey>()
  move = new Dispatcher<TouchKey>()

  constructor() {
    this.onTouch = this.onTouch.bind(this)
    this.onTouches = this.onTouches.bind(this)
  }

  enable($el: Element | Window) {
    $el.addEventListener('touchstart', this.onTouches)
    $el.addEventListener('touchend', this.onTouches)
    $el.addEventListener('touchmove', this.onTouches)
  }

  disable($el: Element | Window) {
    $el.removeEventListener('touchstart', this.onTouches)
    $el.removeEventListener('touchend', this.onTouches)
    $el.removeEventListener('touchmove', this.onTouches)
  }

  getKey(identifier: number) {
    return this.keys[identifier] = this.keys[identifier] || {
      identifier: identifier,
      up: true,
      down: false,
      pressed: false,
      pixels: new Float32Array([0, 0]),
      normalized: new Float32Array([0, 0])
    }
  }

  isUp(identifier: number) {
    return this.getKey(identifier).up
  }

  isDown(identifier: number) {
    return this.getKey(identifier).down
  }

  isPressed(identifier: number) {
    return this.getKey(identifier).pressed
  }

  private onTouches(e: TouchEvent) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      this.onTouch(e, touch)
    }
  }

  private onTouch(e: TouchEvent, _touch: Touch) {
    const touch: TouchKey = this.getKey(_touch.identifier)

    touch.pixels[0] = _touch.clientX
    touch.pixels[1] = _touch.clientY
    this.computeNormalizedPosition(touch)

    if (e.type == "touchend") {
      touch.up = true
      touch.down = false
      touch.pressed = false
      this.up.dispatch(touch)

      this.downPool.remove(touch.identifier)
    }

    else if (e.type == "touchstart") {
      touch.up = false
      touch.down = true
      touch.pressed = true

      this.pressed.dispatch(touch)
      this.downPool.push(touch.identifier)
    }

    else if (e.type == "touchmove") {
      this.move.dispatch(touch)
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

  computeNormalizedPosition(key: TouchKey) {
    key.normalized[0] = key.pixels[0] / this.width
    key.normalized[1] = key.pixels[1] / this.height
  }

}