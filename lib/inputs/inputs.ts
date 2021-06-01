import { KeyboardInput } from "inputs/keyboard";
import { MouseInput } from "inputs/mouse";
import { TouchInput } from "inputs/touch";
import { Key, MKey } from "inputs/key";

export class Inputs {

  keyboard: KeyboardInput
  mouse: MouseInput
  touch: TouchInput

  constructor() {
    this.keyboard = new KeyboardInput()
    this.mouse = new MouseInput()
    this.touch = new TouchInput()
  }

  enable($el: Element | Window) {
    this.keyboard.enable($el)
    this.mouse.enable($el)
    this.touch.enable($el)
  }

  disable($el: Element | Window) {
    this.keyboard.disable($el)
    this.mouse.disable($el)
    this.touch.disable($el)
  }

  update() {
    this.keyboard.update()
    this.mouse.update()
    this.touch.update()
  }

  resize(width: number, height: number) {
    this.mouse.resize(width, height)
    this.touch.resize(width, height)
  }

  isKeyUp(key: Key) {
    return this.keyboard.isUp(key)
  }

  isKeyDown(key: Key) {
    return this.keyboard.isDown(key)
  }

  isKeyPressed(key: Key) {
    return this.keyboard.isPressed(key)
  }

  isMouseUp(key: MKey) {
    return this.mouse.isUp(key)
  }

  isMouseDown(key: MKey) {
    return this.mouse.isDown(key)
  }

  isMousePressed(key: MKey) {
    return this.mouse.isPressed(key)
  }

  isTouchUp(identifier: number) {
    return this.touch.isUp(identifier)
  }

  isTouchDown(identifier: number) {
    return this.touch.isDown(identifier)
  }

  isTouchPressed(identifier: number) {
    return this.touch.isPressed(identifier)
  }

}