
const phpArrayParser = require('./parser/php-array')
const jsonParser = require('json-loader')

/**
 * The Laravel Localization loader.
 * @param  {string} source The source contents.
 * @return {string}        The parsed contents.
 */
const laravelLocalizationLoader = function(source) {
  const isPHP = ~source.indexOf('<?php')
  let parsed;

  if (isPHP) {
    parsed = phpArrayParser(source)
  } else {
    parsed = jsonParser(source)
  }

  return parsed
}

module.exports = laravelLocalizationLoader
