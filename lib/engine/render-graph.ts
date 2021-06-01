import RenderTarget from "gl/RenderTarget";

export type RenderGraphTarget = (targets: Record<string, RenderTarget>) => RenderTarget

export class RenderGraph {
  targets: [string, RenderGraphTarget][] = []

  addTarget(name: string, cb: RenderGraphTarget) {
    this.targets.push([name, cb])
  }

  render() {
    const results: Record<string, RenderTarget> = {}
    for (const [name, target] of this.targets) {
      results[name] = target(results)
    }
    return results
  }

}