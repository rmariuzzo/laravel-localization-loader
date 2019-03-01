'use strict'

/**
 * Test dependencies.
 */

const tmp = require('tmp')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

/**
 * Test cases.
 */

describe('laravel-localization-loader', () => {

  let testDir

  beforeEach(() => {
    testDir = tmp.dirSync({ unsafeCleanup: true })
  })

  afterEach(() => {
    testDir.removeCallback()
  })

  it('should load PHP Laravel translation file', () => {
    return runWebpack(testDir.name, {
      entry: path.join(__dirname, './fixtures/resources/lang/en/messages.php'),
    })
    .then((output) => {
      const result = require(output)
      expect(result).toBeDefined()
      expect(result).toHaveProperty('string', 'Rubens')
      expect(result).toHaveProperty('number', 123)
      expect(result).toHaveProperty('parent.child', 'Mariuzzo')
      expect(result).toHaveProperty('escape', '\'escaped\'')
    })
  })

  it('should load JSON Laravel translation file', () => {
    return runWebpack(testDir.name, {
      entry: path.join(__dirname, './fixtures/resources/lang/en/messages.json'),
    })
    .then((output) => {
      const result = require(output)
      expect(result).toBeDefined()
      expect(result).toHaveProperty('string', 'Rubens')
      expect(result).toHaveProperty('number', 123)
      expect(result).toHaveProperty('parent.child', 'Mariuzzo')
      expect(result).toHaveProperty('escape', '\"escaped\"')
    })
  })
})

/**
 * Test utilities.
 */

/**
 * Run webpack with a default configuration.
 * @param {Object} config Optional configuration to be merged.
 * @return {Promise}
 */

function runWebpack(outputDir, config) {
  return new Promise((resolve, reject) => {

    // Merge default webpack configuration with any provided.
    const webpackConfig = merge({
      output: {
        path: outputDir,
        filename: 'translation.js',
        libraryTarget: 'umd',
      },
      module: {
        rules: [
          {
            test: /resources[\\\/]lang.+\.(php)$/,
            loader: 'laravel-localization-loader',
          }
        ]
      },
      resolveLoader: {
        alias: {
          'laravel-localization-loader': path.resolve(__dirname, '../index.js'),
        }
      }
    }, config)

    // Run webpack.
    webpack(webpackConfig, (webpackError, stats) => {

      // Check for webpack errors.
      const error = webpackError ||
        (stats.hasErrors() && stats.compilation.errors[0]) ||
        (stats.hasWarnings() && stats.compilation.warnings[0])

      if (error) {
        return reject(error)
      }

      const output = `${outputDir}/translation.js`

      // Remove webpack output from Node require's cache.
      delete require.cache[output]

      // Resolve with the recent webpack's output.
      return resolve(output)
    })
  })
}
