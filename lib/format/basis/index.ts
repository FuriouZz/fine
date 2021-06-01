import { GLContext } from "gl/constants/Types";
import Texture, { TextureOptions } from "gl/Texture";
import { ImageBeforeLoad, loadImage } from "lol/js/dom/image";

// asset_path("assets/misc/basis_loader.js")
export async function loadBasis(gl: GLContext, scriptPath: string, path: string, fallbackPath: string, options: Partial<TextureOptions> & { imageOptions?: ImageBeforeLoad }) {
  await _loadScript(scriptPath)
  return _loadBasis(gl, path).then(
    result => {
      options.generateMipMaps = false
      options.filterMipMaps = false
      options.filterMipMapsLinear = false
      const texture = new Texture(gl, options)
      texture.fromWebGLTexture(result.texture, result.width, result.height)
      return texture
    },
    async error => {
      const { element } = await loadImage(fallbackPath, options.imageOptions)
      const texture = new Texture(gl, options)
      texture.fromMedia(element)
      return texture
    }
  )
}

function _loadBasis(gl: GLContext, path: string) {
  return new Promise<{
    texture: WebGLTexture
    width: number
    height: number
  }>(async (resolve, reject) => {
    // @ts-ignore
    const loader = new window.BasisLoader()
    loader.setWebGLContext(gl)
    loader.onerror = reject
    const result = await loader.loadFromUrl(path)
    resolve(result)
  })
}

let SCRIPT_PS: Promise<void> = null
function _loadScript(src: string) {
  if (SCRIPT_PS) return SCRIPT_PS
  return SCRIPT_PS = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.addEventListener("load", () => {
      resolve()
    }, { once: true })
    script.addEventListener("error", () => {
      reject()
    }, { once: true })
    script.src = src
    document.body.append(script)
  })
}