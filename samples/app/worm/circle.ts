import { GLContext, GLType } from "fine/gl/constants/Types";
import { Geometry } from "fine/gl/Geometry";
import { PI2 } from "lol/js/math"
import { State } from "fine/gl/State";
import { Pipeline } from "fine/gl/Pipeline";
import { mat4 } from "gl-matrix";
import { Uniform } from "fine/gl/Uniform";
import { Camera } from "fine/engine/camera/Camera";
import { Transform } from "fine/engine/Transform";
import { Shader, IShader } from "fine/engine/Shader";

function circle(count: number = 10) {
  count = Math.max(count, 3)
  const indices = new Uint16Array(count * 3)
  const vertices = new Float32Array(count * 3 + 3)
  vertices[0] = vertices[1] = vertices[2] = 0

  for (let i = 0; i < count; i++) {
    const progress = i / count

    vertices[(i+1)*3+0] = Math.cos(progress * PI2)
    vertices[(i+1)*3+1] = Math.sin(progress * PI2)
    vertices[(i+1)*3+2] = 0

    indices[i*3+0] = 0
    indices[i*3+1] = i+1
    indices[i*3+2] = i+2 > count ? 1 : i+2
  }

  return [ vertices, indices ]
}

const M4 = mat4.identity(mat4.create())

export class Circle {

  geometry: Geometry
  pipeline: Pipeline
  transform = new Transform()
  ready = false

  constructor(private gl: GLContext, private state: State) {
    this.onUpdateUniforms = this.onUpdateUniforms.bind(this)

    Shader.load('circle.glsl').then((v) => {
      this._init(v.data)
    })
  }

  private _init(shader: IShader) {
    const [vertices, indices] = circle()

    this.geometry = new Geometry(this.gl)
    const buffer = this.geometry.create_array_buffer(vertices)
    buffer.attribute("position", GLType.FLOAT, 3)
    this.geometry.create_index_buffer(GLType.UNSIGNED_SHORT, indices)

    this.pipeline = new Pipeline( this.state )
    this.pipeline.vertex_shader = shader.get('Vertex')
    this.pipeline.fragment_shader = shader.get('Fragment')
    this.pipeline.onUpdateUniforms.on(this.onUpdateUniforms)

    this.ready = true
  }

  onUpdateUniforms(uniforms: Record<string, Uniform>) {
    uniforms['uMVPMatrix'].matrix4( M4 )
  }

  MVP(camera: Camera) {
    camera.model_view_projection_matrix( this.transform.getWorldMatrix(), M4 )
  }

  render() {
    if (!this.ready) return
    this.pipeline.use()
    this.geometry.draw(this.pipeline)
  }

}