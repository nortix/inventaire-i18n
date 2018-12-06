const fs = require('fs')
const path = require('path')
const translatedLangsPath = path.resolve(__dirname, './translated_langs')
const translatedLangs = fs.readFileSync(translatedLangsPath).toString().trim().split(' ')

module.exports = {
  active: [ 'en' ].concat(translatedLangs),
  translated: translatedLangs
}
