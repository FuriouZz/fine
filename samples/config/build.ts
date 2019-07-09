import { AssetPipeline } from "asset-pipeline";
import { Webpack } from "./webpack";
import { WKConfig, WKEnv } from "./types";

function pipeline(key: string) {
  const p = new AssetPipeline(key)
  p.resolve.root(__dirname + '/../')
  p.resolve.output('./public')
  p.manifest.read = false
  // p.manifest.save = false
  return p
}

export default async function main(env: WKEnv = { sample: "triangle" }) {
  const libs = pipeline('libs')
  libs.source.add('app')
  libs.source.add('../fine')
  libs.directory.add('scripts', {
    file_rules: [{ ignore: true }]
  })
  libs.directory.add('js', {
    file_rules: [{ ignore: true }]
  })
  await libs.fetch()

  const entries = pipeline('entries')
  entries.source.add(`app/${env.sample}`)
  entries.file.add('**/*.ts', { rename: "#{name}.js" })
  entries.file.add('**/*.styl', { rename: "#{name}.css" })
  entries.file.add('**/*.html.ejs', { rename: "#{name}", cache: false })
  await entries.fetch()

  const assets = entries.clone("assets")
  assets.source.add('app/@assets')
  assets.source.add('app/@shaders')
  assets.file.add('**/*')
  await assets.fetch()

  const config: WKConfig = {
    watch: false,
    compress: false,
    ejs: {},
    environment: "development",
    entries,
    libs,
    assets
  }

  const w = await Webpack(config)
  // console.log(w.module.rules)
  return w
}