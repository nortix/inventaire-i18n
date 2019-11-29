const enValues = require('../../../original/fullkey.en.json')

module.exports = lang => {
  const langValues = require(`../../../translations/fullkey/${lang}.json`)
  const distValues = {}

  for (const key in enValues) {
    const enValue = enValues[key]
    const langValue = langValues[key]
    distValues[key] = langValue || enValue
  }

  return distValues
}
