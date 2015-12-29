'use strict';

/**
 * Transfer resource.
 *
 * @param {Freenom} api Reference to the Freenom instance.
 * @constructor
 * @public
 */
function Transfer(api) {
  this.endpoint = api.baseUrl + '/domain/transfer';
  this.api = api;
}

/**
 * Get the price of a domain transfer.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Transfer} this
 * @public
 */
Transfer.prototype.price = function price(params, fn) {
  this.api.send(this.endpoint + '/price', 'GET', params, fn);
  return this;
};

/**
 * Request a domain transfer.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Transfer} this
 * @public
 */
Transfer.prototype.request = function request(params, fn) {
  this.api.send(this.endpoint + '/request', 'POST', params, fn);
  return this;
};

/**
 * Approve a domain transfer.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Transfer} this
 * @public
 */
Transfer.prototype.approve = function approve(params, fn) {
  this.api.send(this.endpoint + '/approve', 'POST', params, fn);
  return this;
};

/**
 * Decline a domain transfer.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Transfer} this
 * @public
 */
Transfer.prototype.decline = function decline(params, fn) {
  this.api.send(this.endpoint + '/decline', 'POST', params, fn);
  return this;
};

/**
 * List current domain transfers.
 *
 * @param {Object} [params] Parameters
 * @param {Function} fn Callback
 * @return {Transfer} this
 * @public
 */
Transfer.prototype.list = function list(params, fn) {
  if (typeof params === 'function') {
    fn = params;
    params = {};
  }
  this.api.send(this.endpoint + '/list', 'GET', params, fn);
  return this;
};

module.exports = Transfer;
