const convertMarkdown = require('./convert_markdown')
const enValues = require('../../../original/emails.en.json')

module.exports = lang => {
  const langValues = require(`../../../translations/emails/${lang}.json`)
  const langClientDistValues = require(`../../../dist/client/${lang}.json`)
  const distValues = {}

  for (const key in enValues) {
    // Borrowing values from the client
    const enValue = enValues[key]
    if (enValue === null) {
      distValues[key] = langClientDistValues[key]
    } else {
      const langValue = langValues[key]
      distValues[key] = convertMarkdown(langValue || enValue)
    }
  }

  return distValues
}
