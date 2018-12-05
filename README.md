# inventaire-i18n
[i18n](https://en.wikipedia.org/wiki/I18n) files for Inventaire:
* client: `dist/client`
* server: `dist/emails`


## install
```sh
git clone https://github.com/inventaire/inventaire-i18n
cd inventaire-i18n
npm install
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
