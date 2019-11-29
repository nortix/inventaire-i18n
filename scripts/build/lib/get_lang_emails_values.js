convertMarkdown = require './convert_markdown'
enValues = require '../../../original/emails.en.json'

module.exports = (lang)->
  langValues = require "../../../translations/emails/#{lang}.json"
  langClientDistValues = require "../../../dist/client/#{lang}.json"
  distValues = {}

  for key, enValue of enValues
    # Borrowing values from the client
    if enValue is null
      distValues[key] = langClientDistValues[key]
    else
      langValue = langValues[key]
      distValues[key] = convertMarkdown(langValue or enValue)

  return distValues
