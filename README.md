# eventual-values

`eventual-values` is a tiny JS library that lets you to create values that are themselved pending, errored, or resolved. It is inspired by the [eventual](https://github.com/Gozala/eventual) library.

## Installation

`eventual-values` is available on npm:

```bash
npm install eventual-values
```


## Usage

```js
var eventual = require('eventual-values');

// Create an eventual value
var val = eventual();

// Check its status
eventual.isReady(val);   // => false
eventual.isError(val);   // => false
eventual.isPending(val); // => true

// reject the value
val = eventual.reject('Access denied');
eventual.isReady(val);   // => false
eventual.isError(val);   // => true
eventual.isPending(val); // => false

// Any error is an errored value
eventual.isError(new Error('Access denied')); // => true

// Any other value is a resolved value
eventual.isReady('OK');   // => true
eventual.isError('OK');   // => false
eventual.isPending('OK'); // => false
```

### With ES2015

```js
import eventual, {isReady} from 'eventual-values';
```
