<h1 align="center">Laravel localization Loader</h1>
<p align="center">Laravel localization Loader for Webpack. Convert Laravel Translation files (php or json) to JavaScript Objects.</p>

## Installation

```shell
npm install laravel-localization-loader
```

## Configuration

### Webpack 2

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        // Matches all PHP files in `resources/lang` directory.
        test: /resources\/lang.+\.(php|json)$/,
        loader: 'laravel-localization-loader',
      }
    ]
  },
  // ...
}
```

## Usage with Lang.js

```js
// messages.js
export default {
  // The key format should be: 'locale.filename'.
  'en.messages': require('../../resources/lang/en/messages.php'),
  'es.messages': require('../../resources/lang/es/messages.php'),
  'en.auth': require('../../resources/lang/en/auth.php'),
  'es.auth': require('../../resources/lang/es/auth.php'),
}
```

```js
// page.js
import Lang from 'lang.js'
import messages from './messages'

const lang = new Lang({ messages })
lang.get('messages.hello')
```

## Test

```shell
yarn test
```
