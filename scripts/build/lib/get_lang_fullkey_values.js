enValues = require '../../../original/fullkey.en.json'

module.exports = (lang)->
  langValues = require "../../../translations/fullkey/#{lang}.json"
  distValues = {}

  for key, enValue of enValues
    langValue = langValues[key]
    distValues[key] = langValue or enValue

  return distValues
