/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const transifexResources = [ 'emails',  'shortkey',  'fullkey' ];
const wikidataPropertiesList = require('../../../original/wikidata.properties_list');
const pick = require('lodash.pick');

module.exports = function(lang){
  const translatedResourcesCount = getResourcesTranslatedCount(lang);
  const wikidataTranslatedPropertiesCount = countTranslatedWikidataProperties(lang);
  return translatedResourcesCount + wikidataTranslatedPropertiesCount;
};

var getResourcesTranslatedCount = lang => transifexResources
.map(getCount(lang))
.reduce(sum, 0);

var getCount = lang => (function(resource) {
  let data;
  if (lang === 'en') {
    data = require(`../../../original/${resource}.en.json`);
  } else {
    data = require(`../../../translations/${resource}/${lang}.json`);
  }

  return nonEmptyStringValuesCount(data);
});

var sum = (total, next) => total + next;

var countTranslatedWikidataProperties = function(lang){
  const data = require(`../../../translations/wikidata/${lang}.json`);
  const usedProperties = pick(data, wikidataPropertiesList);
  return nonEmptyStringValuesCount(usedProperties);
};

var nonEmptyStringValuesCount = obj => Object.values(obj)
.filter(isNonEmptyString)
.length;

var isNonEmptyString = str => (typeof str === 'string') && (str.length > 0);
