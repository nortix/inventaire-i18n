# inventaire-i18n
[i18n](https://en.wikipedia.org/wiki/I18n) files for Inventaire:
* client: `dist/client`
* server: `dist/emails`


## install
### development
```sh
git clone https://github.com/inventaire/inventaire-i18n
cd inventaire-i18n
npm install
# Customize ./config/local.coffee Transifex username and password to be able to fetch
# translated strings
npm run fetch-translations
npm run build
```
### production
Building requires to
* set a username and password in `./config/local.coffee` to be authentified on Transifex
* make a SPARQL request per translated languages to get the list of properties

To prevent having to pass by those in production, the [`dist` branch](https://github.com/inventaire/inventaire-i18n/tree/dist) provides builds ready for production
```sh
# Use dist files updated
git clone https://github.com/inventaire/inventaire-i18n --branch dist
```

## fetch
Refresh `./translations` by fetching the latest translations from [Inventaire Transifex project](https://www.transifex.com/inventaire/inventaire) and [Wikidata](https://wikidata.org)
```sh
npm run fetch-translations
```
Wikidata properties aren't refreshed if a file already exist as it can take a while to fetch, but a refresh can be forced by deleting the current files:
```sh
rm ./translations/wikidata/*.json
npm run fetch-translations
```

## build
Populates `./dist/client` and `./dist/emails` with the previously fetched resources
```sh
npm run build-client
npm run build-emails
```

Built values are tailored to work with [Polyglot](http://airbnb.io/polyglot.js/)
