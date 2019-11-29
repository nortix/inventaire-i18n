const convertMarkdown = require('./convert_markdown');
const enValues = require('../../../original/shortkey.en.json');

module.exports = function(lang){
  const langValues = require(`../../../translations/shortkey/${lang}.json`);
  const distValues = {};

  for (let key in enValues) {
    const enValue = enValues[key];
    const langValue = langValues[key];
    distValues[key] = convertMarkdown(langValue || enValue);
  }

  return distValues;
};
