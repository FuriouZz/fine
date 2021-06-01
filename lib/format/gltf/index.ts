import GLTFLoader from "format/gltf/GLTFLoader";
import { GLContext } from "gl/constants/Types";

export async function loadGLTF(gl: GLContext, path: string) {
  const importer = new GLTFLoader(gl)
  await importer.load(path)
  return importer
}