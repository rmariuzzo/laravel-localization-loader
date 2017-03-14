# Laravel Localization loader

Laravel Localization loader for webpack. Convert Laravel Translation strings to JavaScript Objects.

## Installation

```shell
npm install laravel-localization-loader
```

### Usage

#### Webpack 2

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        // Matches all PHP files in `resources/lang` directory.
        test: /resources\/lang.+\.php$/,
        loader: 'laravel-localization-loader',
      }
    ]
  },
  // ...
}
```
## Test

```shell
npm run test
```
