import { Pipeline } from "asset-pipeline/js/pipeline";
import { EJSOptions } from "./ejs-loader";

export interface WKConfig {
  watch: boolean,
  compress: boolean,
  ejs: EJSOptions,
  environment: string,
  entries: Pipeline,
  libs: Pipeline,
  assets: Pipeline
}

export interface WKEnv {
  sample?: string
}