import { GLContext, GLType, GLPrimitive } from "fine/gl/constants/Types";
import { Geometry } from "fine/gl/Geometry";
import { PI2 } from "lol/js/math"
import { State } from "fine/gl/State";
import { Pipeline } from "fine/gl/Pipeline";
import { mat4, vec3 } from "gl-matrix";
import { Uniform } from "fine/gl/Uniform";
import { Camera } from "fine/engine/camera/Camera";
import { Transform } from "fine/engine/Transform";
import { Shader, IShader } from "fine/Shader";

function cylinder(slice = 10, precision = 10) {
  const count = slice * precision
  const indices = new Uint16Array(count * 3 * 2)
  const vertices = new Float32Array(count * 5)

  for (let i = 0; i < slice; i++) {
    for (let j = 0; j < precision; j++) {
      const index = i * precision * 5 + j * 5
      const progress = j / precision

      vertices[index+0] = Math.cos(progress * PI2)
      vertices[index+1] = i / slice
      vertices[index+2] = Math.sin(progress * PI2)
      vertices[index+3] = progress
      vertices[index+4] = i / slice
    }
  }

  let m = 0
  for (let k = 0; k < slice-1; k++) {
    for (let l = 0; l < precision; l++) {

      const offset = k * precision

      indices[m+0] = offset + (l+0)%precision
      indices[m+1] = offset + (l+1)%precision
      indices[m+2] = offset + (l+0)%precision + precision

      indices[m+3] = offset + (l+0)%precision + precision
      indices[m+4] = offset + (l+1)%precision + precision
      indices[m+5] = offset + (l+1)%precision

      m += 6
    }
  }

  return [ vertices, indices ]
}

const M4 = mat4.identity(mat4.create())
const M42 = mat4.identity(mat4.create())

export class Cylinder {

  geometry: Geometry
  pipeline: Pipeline
  transform = new Transform()
  ready = false
  private _anchors: vec3;

  constructor(private state: State) {
    this.onUpdateUniforms = this.onUpdateUniforms.bind(this)

    Promise.all([
      Shader.load('worm.glsl'),
      Shader.load('inc/common.glsl'),
      Shader.load('inc/hermite.glsl'),
      Shader.load('inc/parallel_transform_frame.glsl'),
    ]).then((shaders) => {
      this._init(shaders[0].data)
    })
  }

  private _init(shader: IShader) {
    const [vertices, indices] = cylinder()//circle()

    this.geometry = new Geometry(this.state.gl)
    const buffer = this.geometry.create_array_buffer(vertices)
    buffer.attribute("position", GLType.FLOAT, 3)
    buffer.attribute("texcoord", GLType.FLOAT, 2)
    this.geometry.create_index_buffer(GLType.UNSIGNED_SHORT, indices)
    this.geometry.drawMode = GLPrimitive.LINE_LOOP

    this.pipeline = new Pipeline( this.state )
    this.pipeline.vertex_shader = shader.get('Vertex', { anchorCount: 10 })
    this.pipeline.fragment_shader = shader.get('Fragment')
    this.pipeline.onUpdateUniforms.on(this.onUpdateUniforms)

    this.ready = true
  }

  onUpdateUniforms(uniforms: Record<string, Uniform>) {
    uniforms['uMVPMatrix'].matrix4( M4 )
    uniforms['uProjectionMatrix'].matrix4( M42 )
    uniforms['uAnchors'].vertor3(this._anchors)
  }

  MVP(camera: Camera) {
    camera.model_view_projection_matrix( this.transform.getMatrix(), M4 )
    mat4.copy( M42, camera.viewProjection )
  }

  Anchors(anchors: vec3[]) {
    const a = new Float32Array(anchors.length * 3)
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      a[i*3+0] = anchor[0]//i / anchors.length
      a[i*3+1] = anchor[1]
      a[i*3+2] = -2
    }
    // const a = [].concat(...anchors)
    this._anchors = a as unknown as vec3
  }

  render() {
    if (!this.ready) return
    this.pipeline.use()
    this.geometry.drawCount = this.geometry.indices.vertexCount
    this.geometry.draw(this.pipeline)
  }

}