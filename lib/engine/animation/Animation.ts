import Mesh from "engine/Mesh";
import Transform from "engine/Transform";
import Action from "engine/animation/Action";
import ActionDescriptor from "engine/animation/ActionDescriptor";

export default class Animation {
  descriptors: ActionDescriptor[] = []
  actions: Action[] = []

  get(name: string) {
    return this.descriptors.find(a => a.name === name)
  }

  link(name: string, obj: Transform|Mesh) {
    const desc = this.get(name)
    if (!desc) return
    const action = desc.link(obj)
    this.actions.push(action)
    return action
  }

  unlink(action: Action) {
    const index = this.actions.indexOf(action)
    if (index > -1) {
      this.actions.splice(index, 1)
    }
  }

  update(dt: number) {
    for (let i = 0; i < this.actions.length; i++) {
      const action = this.actions[i]
      if (action && action.running) action.update(dt)
    }
  }

}