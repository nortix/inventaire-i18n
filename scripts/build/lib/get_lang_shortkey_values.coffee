convertMarkdown = require './convert_markdown'
enValues = require '../../../original/shortkey.en.json'

module.exports = (lang)->
  langValues = require "../../../translations/shortkey/#{lang}.json"
  distValues = {}

  for key, enValue of enValues
    langValue = langValues[key]
    distValues[key] = convertMarkdown(langValue or enValue)

  return distValues
