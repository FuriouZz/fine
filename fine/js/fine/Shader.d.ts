import { Resource, ResourceItem } from "./Resource";
export interface IShader {
    get(name?: string, params?: any): string;
}
export declare class Shader {
    static resource: Resource;
    static load(path: string): Promise<ResourceItem<IShader>>;
    static parse(shader: string): IShader;
}
