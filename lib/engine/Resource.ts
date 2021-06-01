import { scope }  from "lol/js/function"
import { Net, IXHROptions } from "lol/js/dom/net";

type Dictionary<T> = Record<string, T>

export interface ResourceItem<T> {
  path: string,
  data: T
}

export default class Resource {
  private _loadables: Dictionary<Promise<ResourceItem<any>>> = {}
  private _results: Dictionary<ResourceItem<any>> = {}

  constructor() {
    scope(this.text, this)
    scope(this.json, this)
    scope(this.bytes, this)
  }

  text(path: string) : Promise<ResourceItem<string>> {
    const loadable = this._loadables[path]
    if (loadable) return loadable

    const text = Net.text(path)
    .then((response) => {
      return this._results[path] = {
        path: path,
        data: response.response as string
      }
    })

    return this._loadables[path] = text
  }

  bytes(path: string) : Promise<ResourceItem<ArrayBuffer>> {
    const loadable = this._loadables[path]
    if (loadable) return loadable

    const bytes = Net.bytes(path)
    .then((response) => {
      return this._results[path] = {
        path: path,
        data: response.response as ArrayBuffer
      }
    })

    return this._loadables[path] = bytes
  }

  json<T>(path: string) : Promise<ResourceItem<T>> {
    const loadable = this._loadables[path]
    if (loadable) return loadable

    const json = Net.json(path)
    .then((response) => {
      return this._results[path] = {
        path: path,
        data: response.response
      }
    })

    return this._loadables[path] = json
  }

  load<T>(path: string, options?: IXHROptions) : Promise<ResourceItem<T>> {
    const loadable = this._loadables[path]
    if (loadable) return loadable

    const json = Net.xhr(path, options)
    .then((response) => {
      return this._results[path] = {
        path: path,
        data: response.response
      }
    })

    return this._loadables[path] = json
  }

  get<T>(path: string) : ResourceItem<T> {
    return this._results[path]
  }

  set(path: string, data: any) {
    this._results[path] = {
      path: path,
      data: data
    }
  }

  finish() {
    const loadables = Object
    .keys(this._loadables)
    .map((key) => this._loadables[key])
    return Promise.all(loadables)
  }

  clear() {
    this._loadables = {}
    this._results = {}
  }

}