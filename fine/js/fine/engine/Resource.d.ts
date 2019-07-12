import { IXHROptions } from "lol/js/net";
export interface ResourceItem<T> {
    path: string;
    data: T;
}
export declare class Resource {
    private _loadables;
    private _results;
    constructor();
    text(path: string): Promise<ResourceItem<string>>;
    bytes(path: string): Promise<ResourceItem<ArrayBuffer>>;
    json<T>(path: string): Promise<ResourceItem<T>>;
    load<T>(path: string, options?: IXHROptions): Promise<ResourceItem<T>>;
    get<T>(path: string): ResourceItem<T>;
    set(path: string, data: any): void;
    finish(): Promise<ResourceItem<any>[]>;
    clean(): void;
}
