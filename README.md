<h1 align="center">Laravel Localization loader</h1>
<h6 align="center">Laravel Localization loader for webpack. Convert Laravel Translation strings to JavaScript Objects.</h6>

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
