module.exports = function(text, url){
  const isExternalLink = url[0] !== '/';
  // on rel='noopener' see: https://mathiasbynens.github.io/rel-noopener
  const openOutsideAttributes = isExternalLink ? "target=\"_blank\" rel=\"noopener\"" : '';

  return `<a href=\"${url}\" class=\"link\" ${openOutsideAttributes}>${text}</a>`;
};
