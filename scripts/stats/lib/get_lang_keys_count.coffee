transifexResources = [ 'emails',  'shortkey',  'fullkey' ]
wikidataPropertiesList = require '../../../original/wikidata.properties_list'
pick = require 'lodash.pick'

module.exports = (lang)->
  translatedResourcesCount = getResourcesTranslatedCount lang
  wikidataTranslatedPropertiesCount = countTranslatedWikidataProperties lang
  return translatedResourcesCount + wikidataTranslatedPropertiesCount

getResourcesTranslatedCount = (lang)->
  transifexResources
  .map getCount(lang)
  .reduce sum, 0

getCount = (lang)-> (resource)->
  if lang is 'en'
    data = require "../../../original/#{resource}.en.json"
  else
    data = require "../../../translations/#{resource}/#{lang}.json"

  return nonEmptyStringValuesCount data

sum = (total, next)-> total + next

countTranslatedWikidataProperties = (lang)->
  data = require "../../../translations/wikidata/#{lang}.json"
  usedProperties = pick data, wikidataPropertiesList
  return nonEmptyStringValuesCount usedProperties

nonEmptyStringValuesCount = (obj)->
  return Object.values(obj)
  .filter isNonEmptyString
  .length

isNonEmptyString = (str)-> typeof str is 'string' and str.length > 0
