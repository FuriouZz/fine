import ts from "typescript";
import { WKConfig } from "./types";
import Fs from "fs";

export function TransformersFactory(config: WKConfig) {
  return function Transformers(program: ts.Program) {
    return {
      before: [
        AssetFactory( config, program )
      ]
    }
  }
}

function AssetFactory(config: WKConfig, program: ts.Program) {

  const regex = {
    read: { match: /@read\([a-zA-Z\.-_\/]+\)/, replace: /@read\(|\)/g },
    asset_path: { match: /@asset_path\([a-zA-Z\.-_\/]+\)/, replace: /@asset_path\(|\)/g },
    asset_url: { match: /@asset_url\([a-zA-Z\.-_\/]+\)/, replace: /@asset_url\(|\)/g }
  }

  const files = {}

  function read_file(path) {
    let content = files[path]
    if (!content) {
      path = config.assets.resolve.source(path, true)
      content = files[path] = Fs.readFileSync(path, { encoding: 'utf-8' })
    }
    return content
  }

  return function AssetTransformer(context: ts.TransformationContext) {
    function visitor(node: ts.Node) {
      // Print asset_path
      if (ts.isStringLiteral(node) && node.text.match(regex.asset_path.match)) {
        const path = node.text.replace(regex.asset_path.replace, '')
        return ts.createLiteral(config.assets.resolve.path(path))
      }

      // Print asset_url
      if (ts.isStringLiteral(node) && node.text.match(regex.asset_url.match)) {
        const path = node.text.replace(regex.asset_url.replace, '')
        return ts.createLiteral(config.assets.resolve.url(path))
      }

      // Read file
      if (ts.isStringLiteral(node) && node.text.match(regex.read.match)) {
        const path = node.text.replace(regex.read.replace, '')
        return ts.createLiteral(read_file(path))
      }

      return ts.visitEachChild(node, visitor, context)
    }

    return function visit(node: ts.Node) {
      return ts.visitNode(node, visitor)
    }
  }
}
