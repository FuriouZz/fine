import { WKConfig } from "./types";
import { Configuration } from "webpack";
import { raw_rule, ejs_rule, styl_rule, ts_rule, file_rule } from "./loaders";

export function misc(w: Configuration, config: WKConfig) {
  w.mode = "production"
  w.context = config.entries.source.all(true)[0]
  w.watch = config.watch
  w.target = "web"

  if (config.environment == "development") {
    w.mode = "development"
    w.cache = true
    w.devtool = "cheap-eval-source-map"
  }
}

export function entries(w: Configuration, config: WKConfig) {
  w.entry = function () {
    const p = config.entries
    const entry: any = {}

    p.manifest.all().forEach((asset) => {
      if (asset.input.match(/\.(js|ts)/)) {
        const output = p.resolve.path(asset.input)
        entry[output] = './' + asset.input
      } else {
        entry['nope.js'] = entry['nope.js'] || []
        entry['nope.js'].push('./' + asset.input)
      }
    })

    return entry
  }
}

export function output(w: Configuration, config: WKConfig) {
  w.output = {}
  w.output.path = config.entries.resolve.output_with('./')
  w.output.filename = '[name]'
  w.output.chunkFilename = '[name].chunk.js'
}

export function server(w: Configuration, config: WKConfig) {
  if (process.argv.join(' ').indexOf('webpack-dev-server') == -1) return

  w.devServer = {
    contentBase: config.assets.source.all(),
    host: "0.0.0.0",
    port: 3000,
    https: true,
    inline: false,
    watchContentBase: true,
    watchOptions: {
      poll: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    },
    disableHostCheck: true,
  }
}

export function resolve(w: Configuration, config: WKConfig) {
  w.resolve = {}
  w.resolve.extensions = ['.js', '.ts']
  w.resolve.alias = {
    'vue$': 'vue/dist/vue/esm.js'
  }

  const libs = ['node_modules']
  config.libs.manifest.all().forEach((asset) => {
    const source = config.libs.resolve.source(asset.output, true)
    libs.push(source)
  })

  w.resolve.modules = libs
}

export function modules(w: Configuration, config: WKConfig) {
  w.module = {
    rules: [
      ejs_rule(w, config),
      styl_rule(w, config),
      ts_rule(w, config),
      raw_rule(w, config),
      file_rule(w, config)
    ]
  }
}

export function optimization(w: Configuration, config: WKConfig) {
  w.optimization = {}
  w.optimization.nodeEnv = config.environment

  if (config.environment != "development") {
    w.optimization.minimize = true
  }
}

export function plugins(w: Configuration, config: WKConfig) {
  w.plugins = []
}

export function ejs_helpers(w: Configuration, config: WKConfig) {
  config.ejs.helpers = config.ejs.helpers || {}

  config.ejs.helpers.asset_path = function() {
    return function (path: string, from?: string) {
      return config.assets.resolve.path(path, from)
    }
  }

  config.ejs.helpers.asset_url = function() {
    return function (path: string, from?: string) {
      return config.assets.resolve.url(path, from)
    }
  }
}

export async function Webpack(config: WKConfig) {
  const w: Configuration = {}
  misc(w, config)
  entries(w, config)
  output(w, config)
  resolve(w, config)
  modules(w, config)
  optimization(w, config)
  plugins(w, config)
  server(w, config)
  ejs_helpers(w, config)
  return w
}