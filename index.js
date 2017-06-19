const phpArrayLoader = require('php-array-loader')
const jsonLoader = require('json-loader')

/**
 * The Laravel Localization loader.
 * @param  {string} source The source contents.
 * @return {string}        The parsed contents.
 */
const laravelLocalizationLoader = function(source) {
  const isPHP = ~source.indexOf('<?php')

  if (isPHP) {
    return phpArrayLoader(source)
  } else {
    return jsonLoader(source)
  }
}

module.exports = laravelLocalizationLoader
