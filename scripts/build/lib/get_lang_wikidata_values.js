propertiesList = require '../../../original/wikidata.properties_list'
enValues = require "../../../translations/wikidata/en.json"

module.exports = (lang)->
  langValues = require "../../../translations/wikidata/#{lang}.json"

  distValues = {}

  for prop in propertiesList
    distValues[prop] = langValues[prop] or enValues[prop]

  return distValues
