import { Key, MKey } from "inputs/key";
import { vec2 } from "gl-matrix";

export interface TouchKey {
  identifier: number,
  down: boolean,
  up: boolean,
  pressed: boolean,
  pixels: Float32Array,
  normalized: Float32Array
}

export interface MouseKey {
  code: MKey,
  key: string,
  down: boolean,
  up: boolean,
  pressed: boolean,
  pixels: vec2,
  normalized: vec2
}

export interface KeyboardKey {
  code: Key,
  key: string,
  down: boolean,
  up: boolean,
  pressed: boolean
}