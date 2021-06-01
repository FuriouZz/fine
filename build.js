const { build } = require('esbuild')
const { fetch } = require('lol/js/node/fs')

build({
  entryPoints: fetch('lib/**/*.ts'),
  outdir: 'dist'
})