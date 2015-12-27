'use strict';

var endpoints = require('./endpoints')
  , request = require('request');

/**
 * Create a Freenom instance.
 *
 * @param {String} [email] Email address used for authentication
 * @param {String} [password] Password used for authentication
 * @constructor
 * @public
 */
function Freenom(email, password) {
  this.baseUrl = 'https://api.freenom.com/v2';
  this.password = password;
  this.email = email;

  //
  // Istantiate the endpoints lazily.
  //
  Object.keys(endpoints).forEach(function each(endpoint) {
    var property = endpoint.toLowerCase()
      , hidden = '_' + property;

    Object.defineProperty(this, hidden, { writable: true });
    Object.defineProperty(this, property, {
      enumerable: true,
      get: function get() {
        return this[hidden] || (this[hidden] = new endpoints[endpoint](this));
      },
      set: function set(value) {
        this[hidden] = value;
      }
    });
  }, this);
}

/**
 * Send a request to a Freenom API endpoint.
 *
 * @param {String} url Fully qualified URI
 * @param {String} method HTTP method
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Freenom} this
 * @private
 */
Freenom.prototype.send = function send(url, method, params, fn) {
  var opts = {
    useQuerystring: true,
    method: method,
    url: url
  };

  if (params) {
    if (!params.password && this.password) params.password = this.password;
    if (!params.email && this.email) params.email = this.email;

    if (method === 'GET') opts.qs = params;
    else opts.form = params;
  }

  request(opts, function done(err, res, body) {
    if (err) return fn(err);

    try {
      body = JSON.parse(body);
    } catch (e) {
      return fn(new Error('Failed to parse the response body'));
    }

    if (body.status === 'error') return fn(new Error(body.error));

    fn(undefined, body);
  });

  return this;
};

module.exports = Freenom;
