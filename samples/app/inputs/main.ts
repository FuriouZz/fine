import { Transform } from "fine/engine/Transform";
import { GLContext, GLPrimitive } from 'fine/gl/constants/Types';
import { State } from "fine/gl/State";
import { GL } from "fine/gl/constants/GL";
import { Camera } from "fine/engine/camera/Camera";
import { System } from "fine/engine/System";
import { PrimitiveMesh } from "fine/gl/primitives/Primitive";
import { Perspective } from "fine/engine/camera/Perspective";
import { Mesh } from "fine/gl/Mesh";
import { Debug } from "fine/gl/debug/Debug"
import { Key } from "fine/inputs/Key";

let rootTransform: Transform
let state: State
let camera: Camera
let system: System
let prim: Mesh
let speed = 0

function render( gl: GLContext ) {
  gl.bindFramebuffer(GL.FRAMEBUFFER, null)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear( GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT )

  // prim.transform.scale[0] = prim.transform.scale[1] = prim.transform.scale[2] = 0.5
  // prim.transform.position[2] = Math.cos( system.playTime ) * 10
  // prim.transform.invalidate()
  // prim.transform.rotateY( system.deltaTime )

  camera.update_view_matrix()
  camera.update_view_projection_matrix()

  rootTransform.updateWorldMatrix()

  if (system.inputs.key.getKey(Key.UP).down) {
    prim.transform.rotateX(-system.deltaTime)
  } else if (system.inputs.key.getKey(Key.DOWN).down) {
    prim.transform.rotateX(system.deltaTime)
  }

  prim.transform.translate(speed * system.deltaTime, 0, 0)
  prim.computeModelViewProjection( camera )
  prim.render()

  state.apply()
}

async function main() {
  const $canvas = document.querySelector('#webgl') as HTMLCanvasElement
  const gl = $canvas.getContext('webgl2') as GLContext
  state = new State(gl)
  rootTransform = new Transform()

  camera = Camera.Perspective(30, $canvas.width/$canvas.height, 0.1, 100)
  camera.transform.position[2] = 10
  camera.transform.invalidate()
  rootTransform.addChild( camera.transform )

  const pipeline = await Debug.pipeline(state, "UV")
  pipeline.cullFaceMode = GL.BACK

  prim = PrimitiveMesh.sphere(pipeline, 1, 10, 10)
  prim.geometry.drawMode = GLPrimitive.LINES
  prim.geometry.drawMode = GLPrimitive.TRIANGLES
  rootTransform.addChild( prim.transform )

  system = new System()
  system.inputs.enable(window)

  // Time scale example
  system.timeScale = 1

  system.resize.on((size) => {
    $canvas.width = size[0]
    $canvas.height = size[1]
    $canvas.style.width = size[0] + 'px'
    $canvas.style.height = size[1] + 'px'

    const lens = camera.lens as Perspective
    lens.aspect = size[0] / size[1]
  })

  system.onResize()

  system.inputs.key.down.on((key) => {
    if (key.code == Key.LEFT) {
      speed -= 0.1
    }
    else if (key.code == Key.RIGHT) {
      speed += 0.1
    }
  })
  system.inputs.key.up.on((key) => {
    if (key.code == Key.LEFT || key.code == Key.RIGHT) {
      speed = 0
    }
  })

  system.render.on(() => render(gl))
}

main()