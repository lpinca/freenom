'use strict';

/**
 * Domain resource.
 *
 * @param {Freenom} api Reference to the Freenom instance.
 * @constructor
 * @public
 */
function Domain(api) {
  this.endpoint = api.baseUrl + '/domain';
  this.api = api;
}

/**
 * Search for available domains.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.search = function search(params, fn) {
  this.api.send(this.endpoint + '/search', 'GET', params, fn);
  return this;
};

/**
 * Register a domain.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.register = function register(params, fn) {
  this.api.send(this.endpoint + '/register', 'POST', params, fn);
  return this;
};

/**
 * Renew a domain name registration.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.renew = function renew(params, fn) {
  this.api.send(this.endpoint + '/renew', 'POST', params, fn);
  return this;
};

/**
 * Get info on registered domain names.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.getinfo = function getinfo(params, fn) {
  this.api.send(this.endpoint + '/getinfo', 'GET', params, fn);
  return this;
};

/**
 * Modify a domain.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.modify = function modify(params, fn) {
  this.api.send(this.endpoint + '/modify', 'PUT', params, fn);
  return this;
};

/**
 * Delete a domain.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.delete = function cancel(params, fn) {
  this.api.send(this.endpoint + '/delete', 'DELETE', params, fn);
  return this;
};

/**
 * Restore a domain.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.restore = function restore(params, fn) {
  this.api.send(this.endpoint + '/restore', 'POST', params, fn);
  return this;
};

/**
 * Upgrade a domain.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.upgrade = function upgrade(params, fn) {
  this.api.send(this.endpoint + '/upgrade', 'POST', params, fn);
  return this;
};

/**
 * List domains in account.
 *
 * @param {Object} [params] Parameters
 * @param {Function} fn Callback
 * @return {Domain} this
 * @public
 */
Domain.prototype.list = function list(params, fn) {
  if (typeof params === 'function') {
    fn = params;
    params = {};
  }
  this.api.send(this.endpoint + '/list', 'GET', params, fn);
  return this;
};

module.exports = Domain;
