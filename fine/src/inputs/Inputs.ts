import { KeyboardInput } from "./Keyboard";
import { MouseInput } from "./Mouse";
import { TouchInput } from "./Touch";

export class Inputs {

  key: KeyboardInput
  mouse: MouseInput
  touch: TouchInput

  constructor() {
    this.key = new KeyboardInput()
    this.mouse = new MouseInput()
    this.touch = new TouchInput()
  }

  enable($el: Element | Window) {
    this.key.enable($el)
    this.mouse.enable($el)
    this.touch.enable($el)
  }

  disable($el: Element | Window) {
    this.key.disable($el)
    this.mouse.disable($el)
    this.touch.disable($el)
  }

  update() {
    this.key.update()
    this.mouse.update()
    this.touch.update()
  }

  resize(width: number, height: number) {
    this.mouse.resize(width, height)
    this.touch.resize(width, height)
  }

}