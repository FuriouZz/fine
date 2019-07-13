import { bind } from "lol/js/function";
import { Key } from "./Key";
import { Dispatcher } from "../utils/Dispatcher"
import { List } from "lol/js/list";
import { toIterable } from "lol/js/list/utils";

interface IKey {
  code: Key,
  key: string,
  down: boolean,
  up: boolean,
  pressed: boolean
}

export class KeyboardInput {

  private _downPool = new List<Key>()
  private _keys: Record<number, IKey> = {}

  up = new Dispatcher<IKey>()
  down = new Dispatcher<IKey>()
  pressed = new Dispatcher<IKey>()

  constructor() {
    bind(this, '_onKey')
  }

  enable($el: Element | Window) {
    $el.addEventListener('keyup', this._onKey)
    $el.addEventListener('keydown', this._onKey)
  }

  disable($el: Element | Window) {
    $el.removeEventListener('keyup', this._onKey)
    $el.removeEventListener('keydown', this._onKey)
  }

  getKey(key: Key) {
    return this._keys[key] = this._keys[key] || {
      code: key,
      key: Key[key],
      up: true,
      down: false,
      pressed: false
    }
  }

  private _onKey(e: KeyboardEvent) {
    const key: IKey = this.getKey(e.keyCode)

    if (e.type == "keyup") {
      key.up = true
      key.down = false
      key.pressed = false
      this.up.dispatch(key)

      this._downPool.remove(key.code)
    }

    else if (e.type == "keydown" && !key.down) {
      key.up = false
      key.down = true
      key.pressed = true
      this.pressed.dispatch(key)

      this._downPool.push(key.code)
    }
  }

  update() {
    for (const key of toIterable(this._downPool)) {
      const keyObject = this.getKey(key)
      if (keyObject) {
        keyObject.pressed = false
        this.down.dispatch(keyObject)
      }
    }
  }

}