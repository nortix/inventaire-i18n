const convertMarkdown = require('./convert_markdown')
const enValues = require('../../../original/shortkey.en.json')

module.exports = lang => {
  const langValues = require(`../../../translations/shortkey/${lang}.json`)
  const distValues = {}

  for (const key in enValues) {
    const enValue = enValues[key]
    const langValue = langValues[key]
    distValues[key] = convertMarkdown(langValue || enValue)
  }

  return distValues
}
