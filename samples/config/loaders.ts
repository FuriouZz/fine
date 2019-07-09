import { Configuration, RuleSetRule } from "webpack";
import { WKConfig } from "./types";
import { TransformersFactory } from "./transformer";
import { StylusPluginFactory } from "./stylus-plugin";

export function file_rule(w: Configuration, config: WKConfig) : RuleSetRule {
  return {
    include: w.context,

    test(resourcePath: string) {
      if (resourcePath.match(/\.(ts|js|styl)/)) return false
      const path = config.assets.resolve.parse(resourcePath)
      if (!path.source) return false
      return config.entries.manifest.has(path.key)
    },

    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath(url: string, resourcePath: string) {
            const path = config.assets.resolve.parse(resourcePath)
            return path.key ? config.assets.resolve.path(path.key) : path.key
          }
        }
      },

      { loader: 'extract-loader' }
    ]
  }
}

export function styl_rule(w: Configuration, config: WKConfig) : RuleSetRule {
  const file = file_rule(w, config)

  return {
    test: /\.styl$/,
    include: w.context,
    use: [
      file.use[0],
      file.use[1],
      {
        loader: 'raw-loader'
      },
      {
        loader: 'stylus-loader',
        options: {
          use: [StylusPluginFactory(config)],
          set: {
            "include css": true,
            "compress": config.compress
          }
        }
      }
    ]
  }
}

export function ts_rule(w: Configuration, config: WKConfig) : RuleSetRule {
  return {
    test: /\.(ts|js)(\.ejs)?$/,
    include: w.context,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: TransformersFactory(config)
        }
      }
    ]
  }
}

export function ejs_rule(w: Configuration, config: WKConfig) : RuleSetRule {
  return {
    test: /\.ejs$/,
    enforce: 'pre',
    include: w.context,
    use: [
      {
        loader: __dirname + '/ejs-loader.js',
        options: config.ejs
      }
    ]
  }
}

export function raw_rule(w: Configuration, config: WKConfig) {
  return {
    test: /\.(html|svg|vert|frag|glsl)$/,
    include: w.context,
    use: ['raw-loader']
  }
}