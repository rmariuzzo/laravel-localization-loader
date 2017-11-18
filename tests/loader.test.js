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
    .then((result) => {
      expect(result).toBeDefined()
      expect(result).toHaveProperty('string', 'Rubens')
      expect(result).toHaveProperty('number', 123)
      expect(result).toHaveProperty('parent.child', 'Mariuzzo')
    })
  })
  it('should load JSON Laravel translation file', () => {
    return runWebpack(testDir.name, {
      entry: path.join(__dirname, './fixtures/resources/lang/en/messages.json'),
    })
    .then((result) => {
      expect(result).toBeDefined()
      expect(result).toHaveProperty('string', 'Rubens')
      expect(result).toHaveProperty('number', 123)
      expect(result).toHaveProperty('parent.child', 'Mariuzzo')
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
            test: /resources\/lang.+\.(php|json)$/,
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

      // Remove webpack output from Node require's cache.
      delete require.cache[`${outputDir}/translation.js`]

      // Resolve with the recente webpack's output.
      return resolve(require(`${outputDir}/translation.js`))
    })
  })
}
