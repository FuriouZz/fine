import { List } from "lol/js/list";
import { toIterable } from "lol/js/list/utils";

export type Listener<T> = (data: T) => void

interface ListenerObject<T> {
  once: boolean,
  fn: Listener<T>
}

export class Dispatcher<T> {

  listeners = new List<ListenerObject<T>>()

  on(listener: Listener<T>) {
    this.listeners.add({ once: false, fn: listener })
  }

  once(listener: Listener<T>) {
    this.listeners.add({ once: true, fn: listener })
  }

  off(listener: Listener<T>) {
    let curr: any
    for (const l of toIterable(this.listeners)) {
      if (l.fn == listener) {
        curr = l
        break
      }
    }

    if (curr) this.listeners.remove(curr)
  }

  dispatch(data?: T) {
    for (const listener of toIterable(this.listeners)) {
      listener.fn(data)
      if (listener.once) {
        this.listeners.remove(listener)
      }
    }
  }

}