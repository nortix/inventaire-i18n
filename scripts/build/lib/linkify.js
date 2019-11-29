module.exports = (text, url)->
  isExternalLink = url[0] isnt '/'
  # on rel='noopener' see: https://mathiasbynens.github.io/rel-noopener
  openOutsideAttributes = if isExternalLink then "target=\"_blank\" rel=\"noopener\"" else ''

  return "<a href=\"#{url}\" class=\"link\" #{openOutsideAttributes}>#{text}</a>"
