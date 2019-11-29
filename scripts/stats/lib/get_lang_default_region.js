# Regions that aren't "#{lang}_#{lang.toUpperCase()}"
specialCaseRegions =
  da: 'da_DK'
  en: 'en_US'
  ja: 'ja_JP'
  no: 'nb_NO'
  sv: 'sv_SE'

module.exports = (lang)-> specialCaseRegions[lang] or "#{lang}_#{lang.toUpperCase()}"
