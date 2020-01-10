const propertiesList = require('../../../original/wikidata.properties_list')

const getPropertiesValuesFilter = () => propertiesList.map(pid => `(wd:${pid})`).join(' ')

module.exports = lang => {
  return `SELECT ?property ?label WHERE {
    VALUES (?property) { ${getPropertiesValuesFilter()} }
    ?property rdfs:label ?label .
    FILTER(LANG(?label) = "${lang}")
  }
  ORDER BY ASC(xsd:integer(STRAFTER(STR(?property), 'P')))
  `
}
