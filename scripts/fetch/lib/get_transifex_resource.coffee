breq = require 'bluereq'
{ username, password } = require('config').transifex
{ yellow } = require 'chalk'
base = 'www.transifex.com/api/2/project/inventaire/resource'

module.exports = (resource, lang)->
  unless resource? then throw new Error('missing resource')
  unless lang? then throw new Error('missing lang')

  url = "https://#{username}:#{password}@#{base}/#{resource}/translation/#{lang}/strings"

  breq.get url
  .get 'body'
  .then format

format = (strings)->
  translations = {}
  for strObj in strings
    key = getKey strObj
    { translation } = strObj
    val = if translation isnt '' then formatValue(translation) else null
    if key? then translations[key] = val
    else console.warn yellow('key not found: ignoring'), strObj

  return reorderKeys translations

# replacing '\\.\\.\\.' by '...'
getKey = (obj)-> obj.key.replace /\\./g, '.'

reorderKeys = (langObj)->
  orderedObj = {}

  Object.keys langObj
  # sort alphabetically
  .sort (a, b)-> a.localeCompare b
  .forEach (key)-> orderedObj[key] = langObj[key]

  return orderedObj

formatValue = (val)->
  # two backslash and a point
  return val.replace '\u005c\u005c.', '.'
