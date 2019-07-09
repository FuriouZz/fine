import { System } from "../System";
import { Scheduler } from "../Scheduler";

let KEYBOARD: Keyboard = null

export class Keyboard {
  keys = {}
  debug = false

  constructor($el?: Element | Window) {
    this.onKey = this.onKey.bind(this)
    this.onUpdate = this.onUpdate.bind(this)

    this.keys = {}
    this.debug = false

    this.activate($el)
    Scheduler.addTimeTask(this.onUpdate, 0, 1/60)
  }

  activate($el?: Element | Window) {
    $el = $el || window
    this.desactivate(window)
    $el.addEventListener('keyup', this.onKey)
    $el.addEventListener('keydown', this.onKey)
  }

  desactivate($el?: Element | Window) {
    $el = $el || window
    $el.removeEventListener('keyup', this.onKey)
    $el.removeEventListener('keydown', this.onKey)
  }

  getKey(code: string) {
    return this.keys[code] = this.keys[code] || { up: false, down: false, press: false, released: true }
  }

  onKey(e: KeyboardEvent) {
    // e.type
    // e.key
    // e.code

    const key = this.getKey(e.code)

    if (e.type == "keyup") {
      key.up = true
      key.down = false
      key.press = false
      key.released = true
      if (this.debug) { console.log("keyup", e.code, e) }
    }

    else if (e.type == "keydown") {
      if (key.released) {
        key.up = false
        key.down = true
        key.released = false
        key.press = true
        if (this.debug) { console.log("keydown", e.code, e) }
        if (this.debug) { console.log("keypress", e.code, e) }
      }
    }
  }

  onUpdate() {
    for (var key in this.keys) {
      this.keys[key].press = false
    }
  }

  keyup(code: string) {
    return this.getKey(code).up
  }

  keydown(code: string) {
    return this.getKey(code).down
  }

  keypress(code: string) {
    return this.getKey(code).press
  }

  static get() {
    if (KEYBOARD == null) KEYBOARD = new Keyboard()
    return KEYBOARD
  }

}