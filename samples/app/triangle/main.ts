import { Transform } from "fine/engine/Transform";
import { Geometry } from "fine/gl/Geometry";
import { GLType, GLContext, GLClear } from 'fine/gl/constants/Types';
import { Pipeline } from 'fine/gl/Pipeline';
import { quat } from 'gl-matrix';
import { Uniform } from 'fine/gl/Uniform';
import { State } from "fine/gl/State";
import { GL } from "fine/gl/constants/GL";

let transform: Transform
let rootTransform: Transform
let geometry: Geometry
let pipeline: Pipeline
let state: State

function onUpdateUniforms(uniforms: Record<string, Uniform>) {
  uniforms['uModelMatrix'].matrix4( transform.getWorldMatrix() )
}

function render( gl: WebGLRenderingContext ) {
  gl.bindFramebuffer(GL.FRAMEBUFFER, null)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear( GLClear.COLOR_BUFFER )

  transform.rotateY(0.01)
  transform.invalidate()

  rootTransform.localPosition[0] = Math.cos( Date.now() * 0.001 ) * 0.5
  rootTransform.invalidate()
  rootTransform.updateWorldMatrix()

  pipeline.use()
  geometry.draw( pipeline )

  window.requestAnimationFrame(() => render(gl))
}

function main() {
  const $canvas = document.querySelector('#webgl') as HTMLCanvasElement
  const gl = $canvas.getContext('webgl2') as WebGL2RenderingContext

  rootTransform = new Transform()
  transform = new Transform()
  rootTransform.addChild(transform)

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

  uniform mat4 uModelMatrix;

  void main() {
    gl_Position = uModelMatrix * vec4(position, 1.0);
  }`
  pipeline.fragment_shader = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`

  pipeline.onUpdateUniforms.on(onUpdateUniforms)

  render(gl)
}

main()