import { Pipeline } from "./Pipeline";

export class PipelineCache {
  pipelines: Record<string, Pipeline> = {}

  create(name: string) {
    return this.set(name, new Pipeline())
  }

  set(name: string, pipeline: Pipeline) {
    return this.pipelines[name] = pipeline
  }

  get(name: string) {
    return this.pipelines[name]
  }

  dispose() {
    Object.keys(this.pipelines).forEach((key) => {
      this.pipelines[key].dispose()
    })
    this.pipelines = {}
  }

}