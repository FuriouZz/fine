import { List } from "lol/js/collections/list";
import { Dispatcher } from "lol/js/dispatcher";
import { Key } from "inputs/key";
import { KeyboardKey } from "inputs/types";

export class KeyboardInput {

  private downPool = new List<Key>()
  private keys: Record<number, KeyboardKey> = {}

  up = new Dispatcher<KeyboardKey>()
  down = new Dispatcher<KeyboardKey>()
  pressed = new Dispatcher<KeyboardKey>()

  constructor() {
    this.onKey = this.onKey.bind(this)
  }

  enable($el: Element | Window) {
    $el.addEventListener('keyup', this.onKey)
    $el.addEventListener('keydown', this.onKey)
  }

  disable($el: Element | Window) {
    $el.removeEventListener('keyup', this.onKey)
    $el.removeEventListener('keydown', this.onKey)
  }

  getKey(key: Key) {
    return this.keys[key] = this.keys[key] || {
      code: key,
      key: Key[key],
      up: true,
      down: false,
      pressed: false
    }
  }

  isUp(key: Key) {
    return this.getKey(key).up
  }

  isDown(key: Key) {
    return this.getKey(key).down
  }

  isPressed(key: Key) {
    return this.getKey(key).pressed
  }

  private onKey(e: KeyboardEvent) {
    const key: KeyboardKey = this.getKey(e.keyCode)

    if (e.type == "keyup") {
      key.up = true
      key.down = false
      key.pressed = false
      this.up.dispatch(key)

      this.downPool.remove(key.code)
    }

    else if (e.type == "keydown" && !key.down) {
      key.up = false
      key.down = true
      key.pressed = true
      this.pressed.dispatch(key)

      this.downPool.push(key.code)
    }
  }

  update() {
    for (const key of this.downPool) {
      const keyObject = this.getKey(key)
      if (keyObject) {
        keyObject.pressed = false
        this.down.dispatch(keyObject)
      }
    }
  }

}