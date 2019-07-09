import { Pipeline } from "./Pipeline";
export class PipelineCache {
    constructor() {
        this.pipelines = {};
    }
    create(name) {
        return this.set(name, new Pipeline());
    }
    set(name, pipeline) {
        return this.pipelines[name] = pipeline;
    }
    get(name) {
        return this.pipelines[name];
    }
    dispose() {
        Object.keys(this.pipelines).forEach((key) => {
            this.pipelines[key].dispose();
        });
        this.pipelines = {};
    }
}
