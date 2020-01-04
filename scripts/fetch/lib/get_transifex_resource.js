const fetch = require('node-fetch')
const { username, password } = require('config').transifex
const { yellow } = require('chalk')
const base = 'www.transifex.com/api/2/project/inventaire/resource'

module.exports = (resource, lang) => {
  if (resource == null) throw new Error('missing resource')
  if (lang == null) throw new Error('missing lang')

  const url = `https://${username}:${password}@${base}/${resource}/translation/${lang}/strings`

  return fetch(url)
  .then(res => res.json())
  .then(format)
}

const format = strings => {
  const translations = {}
  for (const strObj of strings) {
    const key = getKey(strObj)
    const { translation } = strObj
    const val = translation !== '' ? formatValue(translation) : null
    if (key != null) {
      translations[key] = val
    } else {
      console.warn(yellow('key not found: ignoring'), strObj)
    }
  }

  return reorderKeys(translations)
}

// replacing '\\.\\.\\.' by '...'
const getKey = obj => obj.key.replace(/\\./g, '.')

const reorderKeys = langObj => {
  const orderedObj = {}

  Object.keys(langObj)
  // sort alphabetically
  .sort((a, b) => a.localeCompare(b))
  .forEach(key => {
    orderedObj[key] = langObj[key]
  })

  return orderedObj
}

// Two backslash and a point
const formatValue = val => val.replace('\u005c\u005c.', '.')
