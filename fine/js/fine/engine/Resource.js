import { scope } from "lol/js/function";
import { Net } from "lol/js/net";
export class Resource {
    constructor() {
        this._loadables = {};
        this._results = {};
        scope(this.text, this);
        scope(this.json, this);
        scope(this.bytes, this);
    }
    text(path) {
        const loadable = this._loadables[path];
        if (loadable)
            return loadable;
        const text = Net.text(path)
            .then((response) => {
            return this._results[path] = {
                path: path,
                data: response.response
            };
        });
        return this._loadables[path] = text;
    }
    bytes(path) {
        const loadable = this._loadables[path];
        if (loadable)
            return loadable;
        const bytes = Net.bytes(path)
            .then((response) => {
            return this._results[path] = {
                path: path,
                data: response.response
            };
        });
        return this._loadables[path] = bytes;
    }
    json(path) {
        const loadable = this._loadables[path];
        if (loadable)
            return loadable;
        const json = Net.json(path)
            .then((response) => {
            return this._results[path] = {
                path: path,
                data: response.response
            };
        });
        return this._loadables[path] = json;
    }
    load(path, options) {
        const loadable = this._loadables[path];
        if (loadable)
            return loadable;
        const json = Net.xhr(path, options)
            .then((response) => {
            return this._results[path] = {
                path: path,
                data: response.response
            };
        });
        return this._loadables[path] = json;
    }
    get(path) {
        return this._results[path];
    }
    set(path, data) {
        this._results[path] = {
            path: path,
            data: data
        };
    }
    finish() {
        const loadables = Object
            .keys(this._loadables)
            .map((key) => this._loadables[key]);
        return Promise.all(loadables);
    }
    clean() {
        this._loadables = {};
        this._results = {};
    }
}
