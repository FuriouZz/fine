// https://github.com/HeapsIO/heaps/blob/master/hxd/Key.hx
export enum Key {

  BACKSPACE = 8,
  TAB       = 9,
  ENTER     = 13,
  SHIFT     = 16,
  CTRL      = 17,
  ALT       = 18,
  ESCAPE    = 27,
  SPACE     = 32,
  PGUP      = 33,
  PGDOWN    = 34,
  END       = 35,
  HOME      = 36,
  LEFT      = 37,
  UP        = 38,
  RIGHT     = 39,
  DOWN      = 40,
  INSERT    = 45,
  DELETE    = 46,

  QWERTY_EQUALS        = 187,
  QWERTY_MINUS         = 189,
  QWERTY_TILDE         = 192,
  QWERTY_BRACKET_LEFT  = 219,
  QWERTY_BRACKET_RIGHT = 221,
  QWERTY_SEMICOLON     = 186,
  QWERTY_QUOTE         = 222,
  QWERTY_BACKSLASH     = 220,
  QWERTY_COMMA         = 188,
  QWERTY_PERIOD        = 190,
  QWERTY_SLASH         = 191,
  INTL_BACKSLASH       = 226,   // Backslash located next to left shift on some keyboards. Warning: Not available on HLSDL.
  LEFT_WINDOW_KEY      = 91,
  RIGHT_WINDOW_KEY     = 92,
  CONTEXT_MENU         = 93,
  // PRINT_SCREEN = // Only available on SDL

  PAUSE_BREAK = 19,
  CAPS_LOCK   = 20,
  NUM_LOCK    = 144,
  SCROLL_LOCK = 145,

  NUMBER_0 = 48,
  NUMBER_1 = 49,
  NUMBER_2 = 50,
  NUMBER_3 = 51,
  NUMBER_4 = 52,
  NUMBER_5 = 53,
  NUMBER_6 = 54,
  NUMBER_7 = 55,
  NUMBER_8 = 56,
  NUMBER_9 = 57,

  NUMPAD_0 = 96,
  NUMPAD_1 = 97,
  NUMPAD_2 = 98,
  NUMPAD_3 = 99,
  NUMPAD_4 = 100,
  NUMPAD_5 = 101,
  NUMPAD_6 = 102,
  NUMPAD_7 = 103,
  NUMPAD_8 = 104,
  NUMPAD_9 = 105,

  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,

  F1  = 112,
  F2  = 113,
  F3  = 114,
  F4  = 115,
  F5  = 116,
  F6  = 117,
  F7  = 118,
  F8  = 119,
  F9  = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  // Extended F keys
  F13 = 124,
  F14 = 125,
  F15 = 126,
  F16 = 127,
  F17 = 128,
  F18 = 129,
  F19 = 130,
  F20 = 131,
  F21 = 132,
  F22 = 133,
  F23 = 134,
  F24 = 135,

  NUMPAD_MULT  = 106,
  NUMPAD_ADD   = 107,
  NUMPAD_ENTER = 108,
  NUMPAD_SUB   = 109,
  NUMPAD_DOT   = 110,
  NUMPAD_DIV   = 111,

  MOUSE_LEFT       = 0,
  MOUSE_RIGHT      = 1,
  MOUSE_MIDDLE     = 2,
  MOUSE_BACK       = 3,
  MOUSE_FORWARD    = 4,
  MOUSE_WHEEL_UP   = 5,
  MOUSE_WHEEL_DOWN = 6,

  /** a bit that is set for left keys **/
  LOC_LEFT = 256,
  /** a bit that is set for right keys **/
  LOC_RIGHT = 512,

}