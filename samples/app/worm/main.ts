import { Transform } from "fine/engine/Transform";
import { GLContext, GLClear } from 'fine/gl/constants/Types';
import { State } from "fine/gl/State";
import { GL } from "fine/gl/constants/GL";
import { Camera } from "fine/engine/camera/Camera";
import { Perspective } from "fine/engine/camera/Perspective";
import { Circle } from "./circle";
import { System } from "fine/engine/System"
import { Cylinder } from "./cylinder";

let $canvas: HTMLCanvasElement
let rootTransform: Transform
let state: State
let camera: Camera
let system: System
const circles: Circle[] = new Array(10)
let time: number = 0
let deltaTime: number = 0
let dir: number[] = [1, 1]
let z: number[] = [ 0, 0 ]
let ztime = 0
let cylinder: Cylinder

function render( gl: GLContext ) {
  deltaTime = (performance.now() / 1000) - time
  time += deltaTime
  // update()

  gl.bindFramebuffer(GL.FRAMEBUFFER, null)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear( GLClear.COLOR_BUFFER )

  camera.update_view_matrix()
  camera.update_view_projection_matrix()

  rootTransform.updateWorldMatrix()

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.transform.translate(Math.cos(time) * 0.01, Math.sin(time + i * Math.PI) * 0.01,0)
    circle.MVP(camera)
    circle.render()
  }
  cylinder.transform.position[1] = -0.5
  cylinder.transform.invalidate()
  cylinder.transform.rotateY(0.25 * deltaTime)
  cylinder.MVP(camera)
  cylinder.Anchors( circles.map((c) => c.transform.position) )
  cylinder.render()

  window.requestAnimationFrame(() => render(gl))
}

function update() {
  // if (keyboard.keydown("ArrowLeft")) {
  //   circles[0].transform.translate(-1 * deltaTime, 0, 0)
  //   if (dir[0] != -1) {
  //     dir[0] = -1
  //     z[1] = -1
  //     ztime = 0
  //   }
  // }
  // else if (keyboard.keydown("ArrowRight")) {
  //   circles[0].transform.translate(1 * deltaTime, 0, 0)
  //   if (dir[0] != 1) {
  //     dir[0] = 1
  //     z[1] = -1
  //     ztime = 0
  //   }
  // }
  // if (keyboard.keydown("ArrowUp")) {
  //   circles[0].transform.translate(0, 1 * deltaTime, 0)
  //   if (dir[1] != 1) {
  //     dir[1] = 1
  //     z[1] = -1
  //     ztime = 0
  //   }
  // }
  // else if (keyboard.keydown("ArrowDown")) {
  //   circles[0].transform.translate(0, -1 * deltaTime, 0)
  //   if (dir[1] != -1) {
  //     dir[1] = -1
  //     z[1] = -1
  //     ztime = 0
  //   }
  // }

  // ztime += deltaTime
  // if (ztime > 1) z[1] = 0

  // z[0] += (z[1] - z[0]) * 0.01
  // circles[0].transform.position[2] = -2 + z[0]
  // circles[0].transform.invalidate()

  // for (let i = circles.length-1; i > 0; i--) {
  //   const c0 = circles[i]
  //   const c1 = circles[i-1]

  //   c0.transform.translate(
  //     (c1.transform.position[0] - c0.transform.position[0]) * 0.05,
  //     (c1.transform.position[1] - c0.transform.position[1]) * 0.05,
  //     (c1.transform.position[2] - c0.transform.position[2]) * 0.05,
  //   )
  // }
}

function resize() {
  $canvas.width = window.innerWidth
  $canvas.height = window.innerHeight
  $canvas.style.width = window.innerWidth + 'px'
  $canvas.style.height = window.innerHeight + 'px'

  const lens = camera.lens as Perspective
  lens.aspect = $canvas.width / $canvas.height
}

function main() {
  $canvas = document.querySelector('#webgl') as HTMLCanvasElement
  const gl = $canvas.getContext('webgl2') as GLContext
  state = new State(gl)

  window.addEventListener('resize', resize)
  z[1] = -1

  system = new System()
  system.inputs.enable(window)

  rootTransform = new Transform()

  camera = Camera.Perspective(90, $canvas.width/$canvas.height, 0.1, 100)
  camera.transform.position[2] = -1
  camera.transform.invalidate()
  rootTransform.addChild( camera.transform )

  for (let i = 0; i < 10; i++) {
    const circle = new Circle(gl, state)
    circle.transform.translate(i*1, 0, -2)
    circle.transform.setScale(0.1, 0.1, 0.1)
    rootTransform.addChild( circle.transform )
    circles[i] = circle
  }

  cylinder = new Cylinder(state)
  cylinder.transform.translate(0, 0, -2)
  cylinder.transform.setScale(0.5, 0.5, 0.5)
  // cylinder.transform.rotateY(1.5)
  rootTransform.addChild( cylinder.transform )

  resize()
  render(gl)
}

main()