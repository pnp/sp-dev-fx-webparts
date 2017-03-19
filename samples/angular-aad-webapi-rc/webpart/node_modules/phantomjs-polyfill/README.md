# Function.prototype.bind polyfill for PhantomJS

This is a polyfill for function.prototype.bind which is missing from [PhantomJS](http://phantomjs.org/).

## Installation

```
npm install --save-dev phantomjs-polyfill
```

## Usage

```
require('phantomjs-polyfill')
```

### Usage with Karma

Include the polyfill directly in the files list of your karma.conf
```
...
files: [
  './node_modules/phantomjs-polyfill/bind-polyfill.js',
  ...
]
...
