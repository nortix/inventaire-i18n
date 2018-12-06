sections = [ 'emails',  'shortkey',  'fullkey',  'wikidata' ]

module.exports = (lang)->
  sections
  .map getCount(lang)
  .reduce sum, 0

getCount = (lang)-> (section)->
  if lang is 'en' and section isnt 'wikidata'
    data = require "../../../original/#{section}.en.json"
  else
    data = require "../../../translations/#{section}/#{lang}.json"

  return Object.values data
  .filter isNonEmptyString
  .length

isNonEmptyString = (str)-> typeof str is 'string' and str.length > 0

sum = (total, next)-> total + next
