'use strict';

var qs = require('querystring');

var email = 'john@smith.net';
var password = '68bb651cb1';

function stringify(params) {
  var credentials = qs.stringify({
    password: password,
    email: email
  });

  if (!params) return credentials;

  return qs.stringify(params) + '&' + credentials;
}

exports.stringify = stringify;
exports.password = password;
exports.email = email;
