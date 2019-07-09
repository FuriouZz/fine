import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { Touch } from "./Touch";

export class Input {

  static getKeyboard() {
    return Keyboard.get()
  }

  static getMouse() {
    return Mouse.get()
  }

  static getTouch() {
    return Touch.get()
  }

}