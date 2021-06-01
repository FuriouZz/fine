import Renderer from 'engine/Renderer'
import { createRectangleMesh } from 'primitives/rectangle'
import Camera from 'engine/Camera'
import Transform from 'engine/Transform'
import BasicPipeline from 'engine/pipelines/BasicPipeline'

const renderer = new Renderer()
document.body.append(renderer.canvas)
renderer.canvas.style.cssText = `
position: fixed;
top: 0;
left: 0;
`
renderer.resize(window.innerWidth, window.innerHeight)

const root = new Transform()
const pipeline = new BasicPipeline(renderer.gl)
const rectangle = createRectangleMesh(pipeline)
const camera = new Camera()
camera.ortographic({
  top: 0,
  bottom: window.innerHeight,
  left: 0,
  right: window.innerWidth,
})
camera.transform.z = 10

root.addChild(camera.transform)
root.addChild(rectangle.transform)

const render = () => {
  rectangle.transform.uniformScale = Math.cos(performance.now() * 0.001) * window.innerHeight

  root.updateWorldMatrix()
  camera.updateWorldMatrix()

  renderer.render({
    renderable: rectangle,
    camera,
    autoClear: true,
  })
  requestAnimationFrame(render)
}

render()