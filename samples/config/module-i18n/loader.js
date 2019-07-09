const fs = require( 'asset-pipeline/js/utils/fs' )
const path = require('path')

const _cache = {}

function getLocale( files, locale ) {
  let file = null
  for (var i = 0; i < files.length; i++) {
    if (files[i].match(new RegExp(`${locale.toLowerCase()}.json`))) {
      file = files[i]
      break
    }
  }

  if (file === null) return null

  return fs.readFile(file, { encoding: 'utf-8' }).then((content) => JSON.parse(content))
}

function getLocales( files ) {
  const data = {}

  return Promise.all(files.map((file) => {
    const locale = path.basename(file, path.extname(file))

    return getLocale( files, locale )
    .then((content) => {
      data[locale] = content
    })
  }))

  .then(() => data)
}

/**
 *
 *
 * @param {Object} options
 * @param {String} options.dir_path
 * @param {String} [options.locale] Fetch only one locale
 * @returns {Promise|Promise[]}
 */
function load( options ) {

  const files = fs.fetch( path.join(options.dir_path, '*.json') )

  if (options.locale) {
    return getLocale( files, options.locale )
  }

  return getLocales( files )

}

module.exports = { load }