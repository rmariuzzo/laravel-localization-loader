![Laravel localization Loader – Laravel localization Loader for Webpack. Convert Laravel Translation files (php or json) to JavaScript Objects.](banner.svg)


## Features

 - Support both Laravel PHP and JSON translation files.
 - 100% test coverage.
 - Only has one dependencies: [php-array-loader](https://github.com/rmariuzzo/php-array-loader).

## Installation

```shell
npm install laravel-localization-loader --save-dev
```

or

```shell
yarn add laravel-localization-loader --dev
```

## Configuration

### Webpack 2+

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        // Matches all PHP or JSON files in `resources/lang` directory.
        test: /resources[\\\/]lang.+\.(php|json)$/,
        loader: 'laravel-localization-loader',
      }
    ]
  }
}
```

### Laravel Mix

```js
// webpack.mix.js
mix.webpackConfig({
  module: {
    rules: [
      {
        // Matches all PHP or JSON files in `resources/lang` directory.
        test: /resources[\\\/]lang.+\.(php)$/,
        loader: 'laravel-localization-loader',
      }
    ]
  }
});
```

## Usage

### Lang.js

First, you will need to install [Lang.js](https://github.com/rmariuzzo/Lang.js) then you may want to create a `messages.js` files that look as follow:

```js
// messages.js
export default {
  // The key format should be: 'locale.filename'.
  'en.messages': require('../../resources/lang/en/messages.php'),
  'es': require('../../resources/lang/es.json'),
  'en.auth': require('../../resources/lang/en/auth.php'),
  'en': require('../../resources/lang/en.json'),
}
```

Then somewhere else in your awesome app:

```js
// page.js
import Lang from 'lang.js'
import messages from './messages'

const lang = new Lang({ messages })
lang.get('messages.hello')
```

Profit!

## Development

  1. Clone and fork this repo.
  2. Install dependencies: yarn or npm install.
  3. [Run tests](#test).
  4. Prepare a pull request.

### Test

  - `yarn test` – to run all tests.
  - `yarn test -- --watch` – to run all tests in watch mode.

#### Coverage

  - `yarn test -- --coverage` – to run all tests with coverage.
  - `yarn test -- --coverage --watch` – to run all tests with coverage in watch mode.

### Publish

  1. Bump package version: `yarn version --new-version x.x.x -m 'Version %s.'`.
  2. Publish to NPM registry: `npm publish`.
  3. Push new tag: `git push origin --tags`.

<div align=center>

Made with :heart: by [Rubens Mariuzzo](https://github.com/rmariuzzo).

[MIT license](LICENSE)

</div>
