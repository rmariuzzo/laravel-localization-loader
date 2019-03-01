'use strict'

/**
 * Module dependencies.
 * @private
 */

var phpArrayLoader = require('php-array-loader')

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
    return phpArrayLoader(source)
}
