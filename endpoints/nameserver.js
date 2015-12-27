'use strict';

/**
 * NameServer resource.
 *
 * @param {Freenom} api Reference to the Freenom instance.
 * @constructor
 * @public
 */
function NameServer(api) {
  this.endpoint = api.baseUrl + '/nameserver';
  this.api = api;
}

/**
 * Register or modify a nameserver glue record.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {NameServer} this
 * @public
 */
NameServer.prototype.register = function register(params, fn) {
  this.api.send(this.endpoint + '/register', 'PUT', params, fn);
  return this;
};

/**
 * Delete a nameserver glue record.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {NameServer} this
 * @public
 */
NameServer.prototype.delete = function cancel(params, fn) {
  this.api.send(this.endpoint + '/delete', 'DELETE', params, fn);
  return this;
};

/**
 * List nameserver glue records under a domain.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {NameServer} this
 * @public
 */
NameServer.prototype.list = function list(params, fn) {
  this.api.send(this.endpoint + '/list', 'GET', params, fn);
  return this;
};

module.exports = NameServer;
