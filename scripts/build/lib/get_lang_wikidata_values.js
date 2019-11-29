const propertiesList = require('../../../original/wikidata.properties_list');
const enValues = require("../../../translations/wikidata/en.json");

module.exports = function(lang){
  const langValues = require(`../../../translations/wikidata/${lang}.json`);

  const distValues = {};

  for (let prop of propertiesList) {
    distValues[prop] = langValues[prop] || enValues[prop];
  }

  return distValues;
};
