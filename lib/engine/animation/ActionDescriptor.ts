import Mesh from "engine/Mesh";
import Transform from "engine/Transform";
import { SamplerDescription } from "engine/animation/Types";
import Action from "engine/animation/Action";
import { MeshSampler } from "engine/animation/MeshSampler";
import { TransformSampler } from "engine/animation/TransformSampler";

export default class ActionDescriptor {
  name: string = "Action"
  minTime = 0
  maxTime = 0
  samplerDescriptions: SamplerDescription[] = []

  link(obj: Transform | Mesh) {
    const action = new Action()
    action.name = this.name
    action.minTime = this.minTime
    action.maxTime = this.maxTime

    for (const desc of this.samplerDescriptions) {
      if (obj instanceof Mesh) {
        const sampler = new MeshSampler(desc)
        sampler.mesh = obj
        action.samplers.push(sampler)
      } else if (obj instanceof Transform) {
        const sampler = new TransformSampler(desc)
        sampler.transform = obj
        action.samplers.push(sampler)
      }
    }
    return action
  }
}