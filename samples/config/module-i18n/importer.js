const Airtable = require('airtable')
const path = require('path')
const fs = require( 'lol/js/node/fs' )
const { flatten } = require('lol/js/object')

/**
 * @param {Object} options
 * @param {string} options.api APIKey
 * @param {string} options.base BaseKey
 * @param {Object} [options.map]
 * @param {string} [options.map.tab=i18n]
 * @param {string} [options.map.view=Grid view]
 * @param {string} [options.map.locale=Locale]
 * @param {string} [options.map.category=Category]
 * @param {string} [options.map.key=Key]
 * @param {string} [options.map.text=Text]
 */
function importLocales( options ) {
  const base = new Airtable({ apiKey: options.api }).base( options.base )

  const map = options.map || {}

  map.tab = map.tab || 'i18n'
  map.view = map.view || 'Grid view'
  map.locale = map.locale || 'Locale'
  map.category = map.category || 'Category'
  map.key = map.key || 'Key'
  map.text = map.text || 'Text'

  options.flatten = typeof options.flatten === 'boolean' ? options.flatten : false

  return base(options.map.tab)
  .select({ view: map.view })
  .all()
  .then((records) => {

    const data = {}

    records.forEach((record) => {
      const locale = record.get(map.locale)
      const category = record.get(map.category)

      const localeObj   = data[locale]        = data[locale] || {}
      const categoryObj = localeObj[category] = localeObj[category] || {}

      categoryObj[record.get(map.key)] = record.get(map.text) || ''
      categoryObj[record.get(map.key)] = categoryObj[record.get(map.key)].trim()
    })

    const promises = Object.keys(data).map((locale) => {
      fs.ensureDir( options.dir_path )

      if (options.flatten) {
        data[locale] = flatten(data[locale])
      }

      return fs.writeFile( JSON.stringify( data[locale], null, 2 ), path.join(options.dir_path, locale + '.json') )
    })

    return Promise.all(promises)

  })
}

module.exports = { importLocales }