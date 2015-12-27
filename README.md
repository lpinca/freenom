# freenom

[![Version npm][npm-freenom-badge]][npm-freenom]
[![Build Status][travis-freenom-badge]][travis-freenom]
[![Coverage Status][coverage-freenom-badge]][coverage-freenom]

Freenom API bindings for Node.js.

## Install

```
npm install --save freenom
```

## API

This module exports a constructor function which takes two arguments:

```js
var Freenom = require('freenom');

var freenom = new Freenom([email][, password]);
```

The `email` and `password` arguments are optional. If you provide them, you can
avoid to specify the authentication parameters when you call the methods that
require authentication.

Every resource is accessed via your `freenom` instance:

```js
var freenom = new Freenom();
// freenom.<resouce_name>.<method_name>
```

The last argument of every resource method is an error-first callback:

```js
var freenom = new Freenom();

freenom.service.ping(function (err, res) {
  if (err) throw err;

  console.log(res);
});
```

### Available resources and methods

- service
  - `ping(callback)`
- domain
  - `search(params, callback)`
  - `register(params, callback)`
  - `renew(params, callback)`
  - `getinfo(params, callback)`
  - `modify(params, callback)`
  - `delete(params, callback)`
  - `restore(params, callback)`
  - `upgrade(params, callback)`
  - `list([params], callback)`
- nameserver
  - `register(params, callback)`
  - `delete(params, callback)`
  - `list(params, callback)`

where `params` is a plain JavaScript object, e.g. `{ domainname: 'test002.tk' }`.
The parameters documentation can be found at http://www.freenom.com/en/freenom-api.html.

## Credits

Structured after the [fullcontact][fullcontact] package.

## License

[MIT](LICENSE)

[npm-freenom-badge]: https://img.shields.io/npm/v/freenom.svg
[npm-freenom]: https://www.npmjs.com/package/freenom
[travis-freenom-badge]: https://img.shields.io/travis/lpinca/freenom/master.svg
[travis-freenom]: https://travis-ci.org/lpinca/freenom
[coverage-freenom-badge]: https://img.shields.io/coveralls/lpinca/freenom/master.svg
[coverage-freenom]: https://coveralls.io/r/lpinca/freenom?branch=master
[fullcontact]: https://github.com/observing/fullcontact
