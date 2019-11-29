/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const breq = require('bluereq');
const { username, password } = require('config').transifex;
const { yellow } = require('chalk');
const base = 'www.transifex.com/api/2/project/inventaire/resource';

module.exports = function(resource, lang){
  if (resource == null) { throw new Error('missing resource'); }
  if (lang == null) { throw new Error('missing lang'); }

  const url = `https://${username}:${password}@${base}/${resource}/translation/${lang}/strings`;

  return breq.get(url)
  .get('body')
  .then(format);
};

var format = function(strings){
  const translations = {};
  for (let strObj of strings) {
    const key = getKey(strObj);
    const { translation } = strObj;
    const val = translation !== '' ? formatValue(translation) : null;
    if (key != null) { translations[key] = val;
    } else { console.warn(yellow('key not found: ignoring'), strObj); }
  }

  return reorderKeys(translations);
};

// replacing '\\.\\.\\.' by '...'
var getKey = obj => obj.key.replace(/\\./g, '.');

var reorderKeys = function(langObj){
  const orderedObj = {};

  Object.keys(langObj)
  // sort alphabetically
  .sort((a, b) => a.localeCompare(b))
  .forEach(key => orderedObj[key] = langObj[key]);

  return orderedObj;
};

var formatValue = val => // two backslash and a point
val.replace('\u005c\u005c.', '.');
