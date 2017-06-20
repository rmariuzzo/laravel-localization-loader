var phpArrayLoader = require('php-array-loader')
var jsonLoader = require('json-loader')

/**
 * The Laravel Localization loader.
 * @param  {string} source The source contents.
 * @return {string}        The parsed contents.
 */
var laravelLocalizationLoader = function(source) {
  var isPHP = ~source.indexOf('<?php')

  if (isPHP) {
    return phpArrayLoader(source)
  } else {
    return jsonLoader(source)
  }
}

module.exports = laravelLocalizationLoader
