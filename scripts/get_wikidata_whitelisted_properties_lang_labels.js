#!/usr/bin/env node
const { getManyEntities } = require('wikidata-sdk')
const { readFileSync, promises: fsPromises  } = require('fs')
const { writeFile } = fsPromises
const languages = readFileSync('./assets/translated_langs').toString().trim().split(' ')
// 'en' isn't considered a translated language, as it's the original language for other translated assets
languages.push('en')
const properties = require('../original/wikidata.properties_list')
const fetch = require('node-fetch')
const { green } = require('tiny-chalk')

const urls = getManyEntities({ ids: properties, languages, props: 'labels' })

const labelPerLanguage = {}
languages.forEach(lang => labelPerLanguage[lang] = {})

const getData = async () => {
  const allProperties = {}
  for (const url of urls) {
    const { entities } = await fetch(url).then(res => res.json())
    Object.assign(allProperties, entities)
  }
  return allProperties
}

const prepareForSave = allProperties => {
  for (const propertyId in allProperties) {
    const { labels } = allProperties[propertyId]
    for (const lang in labels) {
      labelPerLanguage[lang][propertyId] = labels[lang].value
    }
  }
}

const saveTranslationFiles = async () => {
  for (const lang in labelPerLanguage) {
    const data = labelPerLanguage[lang]
    await writeFile(`translations/wikidata/${lang}.json`, JSON.stringify(data, null, 2) + '\n')
    console.log(green(`fetched: wikidata - ${lang}`))
  }
}

getData()
.then(prepareForSave)
.then(saveTranslationFiles)
.catch(err => {
  console.error(err)
  process.exit(1)
})
