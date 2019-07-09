import { Pipeline } from "./Pipeline";
export declare class PipelineCache {
    pipelines: Record<string, Pipeline>;
    create(name: string): Pipeline;
    set(name: string, pipeline: Pipeline): Pipeline;
    get(name: string): Pipeline;
    dispose(): void;
}
