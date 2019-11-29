const transifexResources = [ 'emails', 'shortkey', 'fullkey' ]
const wikidataPropertiesList = require('../../../original/wikidata.properties_list')
const pick = require('lodash.pick')

module.exports = lang => {
  const translatedResourcesCount = getResourcesTranslatedCount(lang)
  const wikidataTranslatedPropertiesCount = countTranslatedWikidataProperties(lang)
  return translatedResourcesCount + wikidataTranslatedPropertiesCount
}

const getResourcesTranslatedCount = lang => {
  return transifexResources
  .map(getCount(lang))
  .reduce(sum, 0)
}

const getCount = lang => resource => {
  let data
  if (lang === 'en') {
    data = require(`../../../original/${resource}.en.json`)
  } else {
    data = require(`../../../translations/${resource}/${lang}.json`)
  }

  return nonEmptyStringValuesCount(data)
}

const sum = (total, next) => total + next

const countTranslatedWikidataProperties = lang => {
  const data = require(`../../../translations/wikidata/${lang}.json`)
  const usedProperties = pick(data, wikidataPropertiesList)
  return nonEmptyStringValuesCount(usedProperties)
}

const nonEmptyStringValuesCount = obj => {
  return Object.values(obj)
  .filter(isNonEmptyString)
  .length
}

const isNonEmptyString = str => (typeof str === 'string') && (str.length > 0)
