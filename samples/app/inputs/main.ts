import { Transform } from "fine/engine/Transform";
import { Geometry } from "fine/gl/Geometry";
import { GLType, GLContext, GLClear } from 'fine/gl/constants/Types';
import { Pipeline } from 'fine/gl/Pipeline';
import { mat4 } from 'gl-matrix';
import { Uniform } from 'fine/gl/Uniform';
import { State } from "fine/gl/State";
import { GL } from "fine/gl/constants/GL";
import { Camera } from "fine/engine/camera/Camera";
import { System } from "fine/engine/System";

let transform: Transform
let rootTransform: Transform
let geometry: Geometry
let pipeline: Pipeline
let state: State
let camera: Camera
let system: System
const M4 = mat4.identity(mat4.create())

function onUpdateUniforms(uniforms: Record<string, Uniform>) {
  camera.model_view_projection_matrix( transform.getMatrix(), M4 )
  uniforms['uMVPMatrix'].matrix4( M4 )
}

function render( gl: GLContext ) {
  gl.bindFramebuffer(GL.FRAMEBUFFER, null)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear( GLClear.COLOR_BUFFER )

  transform.scale[0] = transform.scale[1] = transform.scale[2] = 10
  transform.position[2] = Math.cos( system.playTime ) * 10
  transform.invalidate()

  camera.update_view_matrix()
  camera.update_view_projection_matrix()

  rootTransform.updateWorldMatrix()

  pipeline.use()
  geometry.draw( pipeline )
}

function main() {
  const $canvas = document.querySelector('#webgl') as HTMLCanvasElement
  const gl = $canvas.getContext('webgl2') as GLContext

  system = new System()
  system.inputs.enable(window)
  system.inputs.key.up.on((e) => {
    console.log("keyUP", e)
  })
  system.inputs.mouse.down.on((e) => {
    console.log("mouseDOWN", e)
  })
  system.inputs.touch.pressed.on((e) => {
    console.log("touchpressed", e)
  })

  // Time scale example
  system.timeScale = 3

  console.log(system);


  rootTransform = new Transform()
  transform = new Transform()
  rootTransform.addChild(transform)

  camera = Camera.Perspective(90, $canvas.width/$canvas.height, 0.1, 100)
  camera.transform.position[2] = -1
  camera.transform.invalidate()
  rootTransform.addChild( camera.transform )

  geometry = new Geometry(gl)

  let buffer = geometry.create_array_buffer()
  buffer.attribute("position", GLType.FLOAT, 3)
  buffer.data(new Float32Array([
    -0.5, -0.5, 0.0,
    -0.0,  0.5, 0.0,
     0.5, -0.5, 0.0
  ]))

  geometry.create_index_buffer(GLType.UNSIGNED_SHORT, new Uint16Array([
    0, 1, 2
  ]))

  state = new State(gl)

  pipeline = new Pipeline( state )
  pipeline.vertex_shader = `
  attribute vec3 position;

  uniform mat4 uMVPMatrix;

  void main() {
    gl_Position = uMVPMatrix * vec4(position, 1.0);
  }`
  pipeline.fragment_shader = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`

  pipeline.onUpdateUniforms.on(onUpdateUniforms)

  system.render.on(() => render(gl))
  // render(gl)
}

main()