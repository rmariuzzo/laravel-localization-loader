'use strict'

/**
 * Module dependencies.
 * @private
 */

var phpArrayLoader = require('php-array-loader')
var jsonLoader = require('json-loader')

/**
 * Module exports.
 */

module.exports = laravelLocalizationLoader

/**
 * The Laravel Localization loader.
 * @param  {string} source The source contents.
 * @return {string}        The parsed contents.
 */

function laravelLocalizationLoader(source) {
  var isPHP = ~source.indexOf('<?php')

  if (isPHP) {
    return phpArrayLoader(source)
  } else {
    return jsonLoader(source)
  }
}
