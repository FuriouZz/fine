const { deploy, invalidate_paths } = require('./tasks')
const fs = require('fs')
const path = require('path')

module.exports = class AWSDeployPlugin {

  constructor( options ) {
    this.deploy = this.deploy.bind(this)
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.done.tap('aws-deploy', this.deploy)
  }

  async deploy() {
    this.create_version_file()
    await deploy( this.options )
    if (this.options.cloudfront != null) await invalidate_paths( this.options )
  }

  create_version_file() {
    fs.writeFileSync(path.join(this.options.dir_path, '.version'), AWSDeployPlugin.version())
  }

  static version() {
    const d = new Date()

    let date = d.getDate()
    date = date < 10 ? "0"+date : ""+date

    let month = d.getMonth() + 1
    month = month < 10 ? "0"+month : ""+month

    let hour = d.getHours()
    hour = hour < 10 ? "0"+hour : ""+hour

    let minute = d.getMinutes()
    minute = minute < 10 ? "0"+minute : ""+minute

    let second = d.getSeconds()
    second = second < 10 ? "0"+second : ""+second

    const year = d.getFullYear()

    return date + month + year + hour + minute + second
  }

}