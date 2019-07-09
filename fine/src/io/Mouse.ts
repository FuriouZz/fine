import { Scheduler } from "../Scheduler";

let MOUSE = null

export class Mouse {
  _x = 0
  _y = 0
  _movementX = 0
  _movementY = 0

  keys = {}

  debug = false

  constructor() {
    this.onMouse = this.onMouse.bind(this)
    this.onUpdate = this.onUpdate.bind(this)

    this.activate(window)
    Scheduler.addTimeTask(this.onUpdate, 0, 1/60)
  }

  activate($el: Element | Window) {
    $el = $el || window
    this.desactivate(window)
    $el.addEventListener('mouseup', this.onMouse)
    $el.addEventListener('mousedown', this.onMouse)
    $el.addEventListener('mousemove', this.onMouse)
  }

  desactivate($el: Element | Window) {
    $el = $el || window
    $el.removeEventListener('mouseup', this.onMouse)
    $el.removeEventListener('mousedown', this.onMouse)
    $el.removeEventListener('mousemove', this.onMouse)
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  get movementX() {
    return this._movementX
  }

  get movementY() {
    return this._movementY
  }

  getKey(code: number) {
    return this.keys[code] = this.keys[code] || { up: false, down: false, press: false, released: true }
  }

  mouseup(code: number) {
    return this.getKey(code).up
  }

  mousedown(code: number) {
    return this.getKey(code).down
  }

  mousepress(code: number) {
    return this.getKey(code).press
  }

  onMouse(e: MouseEvent) {
    // e.type
    // e.clientX
    // e.clientY

    const key = this.getKey(e.button)

    if (e.type == "mouseup") {
      key.up = true
      key.down = false
      key.press = false
      key.released = true
      if (this.debug) { console.log("mouseup", e.button, e.buttons, e) }
    }

    else if (e.type == "mousedown") {
      if (key.released) {
        key.up = false
        key.down = true
        key.released = false
        key.press = true
        if (this.debug) { console.log("mousedown", e.button, e.buttons, e) }
        if (this.debug) { console.log("mousepress", e.button, e.buttons, e) }
      }
    }

    else if (e.type == "mousemove") {
      this._x = e.clientX
      this._y = e.clientY
      this._movementX = e.movementX
      this._movementY = e.movementY
    }
  }

  onUpdate() {
    this._movementX = 0
    this._movementY = 0

    for (var key in this.keys) {
      this.keys[key].press = false
    }
  }

  static get() {
    if (MOUSE == null) MOUSE = new Mouse()
    return MOUSE
  }

}