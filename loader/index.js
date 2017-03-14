const phpArrayParser = require('./parser/php-array')
const jsonParser = require('json-loader');

const laravelLocalizationLoader = function(source) {
  const isPHP = ~source.indexOf('<?php')
  if (isPHP) {
    return phpArrayParser(source)
  } else {
    return jsonParser(source)
  }
}

module.exports = laravelLocalizationLoader
