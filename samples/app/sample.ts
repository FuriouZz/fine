import { GLContext } from "fine/gl/constants/Types";
import { Camera } from "fine/engine/camera/Camera";
import { Perspective } from "fine/engine/camera/Perspective";
import { System } from "fine/engine/System";
import { State } from "fine/gl/State";
import { Transform } from "fine/engine/Transform";

export class Sample {

  $canvas: HTMLCanvasElement
  gl: GLContext

  state: State
  root = new Transform()
  system = new System()

  camera = Camera.Perspective(30, 16/9, 0.1, 100)

  constructor() {
    this.resize = this.resize.bind(this)
    this.render = this.render.bind(this)

    this.$canvas = document.querySelector('#webgl') as HTMLCanvasElement
    this.gl = this.$canvas.getContext('webgl2') as GLContext
    this.state = new State(this.gl)

    this.camera.transform.translate(0, 0, 10)
    this.root.addChild( this.camera.transform )


    this.onSetup()
  }

  play() {
    this.system.inputs.enable(window)
    this.system.resize.on(this.resize)
    this.system.render.on(this.render)

    this.system.onResize()
  }

  resize(size: Float32Array) {
    this.$canvas.width = size[0]
    this.$canvas.height = size[1]
    this.$canvas.style.width = size[0] + 'px'
    this.$canvas.style.height = size[1] + 'px'

    const lens = this.camera.lens as Perspective
    lens.aspect = size[0] / size[1]
    this.onResize()
  }

  render() {
    const gl = this.gl

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 1)
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )

    this.camera.update_view_matrix()
    this.camera.update_view_projection_matrix()

    this.root.updateWorldMatrix()

    this.onUpdate()
    this.onRender()

    this.state.apply()
  }

  onSetup() {}
  onResize() {}
  onUpdate() {}
  onRender() {}

}