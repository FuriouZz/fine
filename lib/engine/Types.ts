import Geometry from "gl/Geometry";
import Pipeline from "gl/Pipeline";
import Camera from "engine/Camera";
import Light from "engine/Light";
import RenderPass from "engine/RenderPass";
import Transform from "engine/Transform";
import StateClearConfig from "gl/StateClearConfig";
import RenderTarget, { RenderTargetOptions } from "gl/RenderTarget";

export interface RendererOptions extends WebGLContextAttributes {
  canvas: HTMLCanvasElement
  version: 1 | 2
  pixelRatio: number
  stencil: boolean
  alpha: boolean
  antialias: boolean
  preserveDrawingBuffer: boolean
}

export interface IRenderable {
  render(camera?: Camera, lights?: LightsData): void
}

export interface RendererRenderOptions {
  target: RenderTarget
  camera: Camera
  lights: Light[]
  transform: Transform
  renderable: IRenderable
  renderables: IRenderable[]
  pipeline: Pipeline
  geometry: Geometry
  clear: StateClearConfig
  autoClear: boolean
  area: [left: number, top: number, width: number, height: number]
}

export interface IRenderer {
  render(options?: Partial<RendererRenderOptions>): void
}


export interface PostProcessOptions extends Partial<RenderTargetOptions> {
  geometry?: Geometry
  pixelRatio?: number
}

export interface PostProcessPassOptions {
  vertexShader: string
  fragmentShader: string
  pipeline: Pipeline
  pass: RenderPass
}

export interface PostProcessRenderOption {
  enabled?: boolean
  render: (destination?: RenderTarget) => void
  target?: RenderTarget
}

export interface LightsData {
  points: PointLightData
}

export interface PointLightData {
  count: number
  positions: number[]
  colors: number[]
  parameters: number[]
}

export interface CameraOrthographicOptions {
  left: number
  right: number
  bottom: number
  top: number
  near: number
  far: number
  zoom: number
}

export interface CameraPerspectiveOptions {
  fovy: number
  aspect: number
  near: number
  far: number
}