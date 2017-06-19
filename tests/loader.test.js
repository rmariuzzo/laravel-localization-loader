const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

test('should load PHP Laravel translation file', () => {
  return runWebpack({
    entry: path.join(__dirname, './fixtures/resources/lang/en/messages.php'),
  })
  .then((result) => {
    expect(result).toBeDefined()
    expect(result).toHaveProperty('string', 'Rubens')
    expect(result).toHaveProperty('number', 123)
    expect(result).toHaveProperty('parent.child', 'Mariuzzo')
  })
})

function runWebpack(config) {
  return new Promise((resolve, reject) => {
    const webpackConfig = merge({
      output: {
        path: path.join(__dirname, 'output'),
        filename: 'translation.js',
        libraryTarget: 'umd',
      },
      module: {
        rules: [
          {
            test: /resources\/lang.+\.php$/,
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

    webpack(webpackConfig, (webpackError, stats) => {
      const error = webpackError ||
        (stats.hasErrors() && stats.compilation.errors[0]) ||
        (stats.hasWarnings() && stats.compilation.warnings[0])
      if (error) {
        return reject(error)
      }

      delete require.cache[path.resolve(__dirname, './output/translation.js')]
      return resolve(require('./output/translation.js'))
    })
  })
}
