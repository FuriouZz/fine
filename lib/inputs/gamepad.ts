import { List } from "lol/js/list";

export class GamepadInput {

  private keys: Record<number, Gamepad> = {}
  private gamepads: List<Gamepad> = new List<Gamepad>()

  enable() {
    window.addEventListener('gamepadconnected', this.onGamepadConnected)
    window.addEventListener('gamepaddisconnected', this.onGamepadDisconnected)
  }

  disable() {
    window.removeEventListener('gamepadconnected', this.onGamepadConnected)
    window.removeEventListener('gamepaddisconnected', this.onGamepadDisconnected)
  }

  getGamepad(index: number) {
    return this.keys[index]
  }

  private onGamepadConnected(e: GamepadEvent) {
    this.keys[e.gamepad.index] = e.gamepad
    this.gamepads.add( e.gamepad )
  }

  private onGamepadDisconnected(e: GamepadEvent) {
    delete this.keys[e.gamepad.index]
    this.gamepads.remove(e.gamepad)
  }

  update() {
    // for (const gamepad of toIterable(this._gamepads)) {

    // }
  }

}