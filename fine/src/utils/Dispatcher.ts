export type IDispatcherListener<T> = (data?: T) => void

export interface IDispatcherListenerItem<T> {
  fn: IDispatcherListener<T>,
  once: boolean
}

export class Dispatcher<T> {

  listeners: Array<IDispatcherListenerItem<T>> = []

  on(listener: IDispatcherListener<T>) {
    this.listeners.push({ once: false, fn: listener })
  }

  once(listener: IDispatcherListener<T>) {
    this.listeners.push({ once: true, fn: listener })
  }

  off(listener: IDispatcherListener<T>) {
    let i = 0
    let len = this.listeners.length
    while (i < len) {
      if (this.listeners[i]) {
        if (this.listeners[i].fn == listener) {
          break;
        }
      }
      i++
    }

    if (i < len && i >= 0) {
      this.listeners.splice( i, 1 )
    }
  }

  dispatch(data?: T) {
    let i = 0
    let len = this.listeners.length
    while (i < len) {
      if (this.listeners[i]) {
        this.listeners[i].fn(data)
        if (this.listeners[i].once) {
          this.off(this.listeners[i].fn)
        }
      }
      i++
    }
  }

}