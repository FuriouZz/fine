import { Scheduler } from "../Scheduler";

let TOUCH = null

export class Touch {
  _x = 0
  _y = 0

  keys = {}

  debug = false

  constructor() {
    this.onTouch = this.onTouch.bind(this)
    this.onUpdate = this.onUpdate.bind(this)

    this.activate(window)
    Scheduler.addTimeTask(this.onUpdate, 0, 1/60)
  }

  activate($el: Element | Window) {
    $el = $el || window
    this.desactivate(window)
    $el.addEventListener('touchstart', this.onTouch)
    $el.addEventListener('touchend', this.onTouch)
    $el.addEventListener('touchmove', this.onTouch)
  }

  desactivate($el: Element | Window) {
    $el = $el || window
    $el.removeEventListener('touchstart', this.onTouch)
    $el.removeEventListener('touchend', this.onTouch)
    $el.removeEventListener('touchmove', this.onTouch)
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  getKey(code: number) {
    return this.keys[code] = this.keys[code] || { up: false, down: false, press: false, released: true }
  }

  touchstart(code: number) {
    return this.getKey(code).up
  }

  touchend(code: number) {
    return this.getKey(code).down
  }

  tap(code: number) {
    return this.getKey(code).press
  }

  onTouch(e: TouchEvent) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];

      const key = this.getKey(touch.identifier)

      if (e.type == "touchend") {
        key.up = true
        key.down = false
        key.press = false
        key.released = true
        if (this.debug) { console.log("touchend", touch.identifier, e) }
      }

      else if (e.type == "touchstart") {
        if (key.released) {
          key.up = false
          key.down = true
          key.released = false
          key.press = true
          if (this.debug) { console.log("touchstart", touch.identifier, e) }
          if (this.debug) { console.log("tap", touch.identifier, e) }
        }
      }

      else if (e.type == "touchmove") {
        this._x = touch.clientX
        this._y = touch.clientY
      }

    }
  }

  onUpdate() {
    for (var key in this.keys) {
      this.keys[key].press = false
    }
  }

  static get() {
    if (TOUCH == null) TOUCH = new Touch()
    return TOUCH
  }

}