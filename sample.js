const { serve } = require('esbuild')

serve({
  servedir: 'sample',
  port: 3000
}, {
  entryPoints: [ 'sample/index.ts' ],
  outfile: 'sample/main.js',
  bundle: true,
}).then(server => {
  // Call "stop" on the web server when you're done
  // server.stop()
})