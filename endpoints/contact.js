'use strict';

/**
 * Contact resource.
 *
 * @param {Freenom} api Reference to the Freenom instance.
 * @constructor
 * @public
 */
function Contact(api) {
  this.endpoint = api.baseUrl + '/contact';
  this.api = api;
}

/**
 * Create or modify a contact.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Contact} this
 * @public
 */
Contact.prototype.register = function register(params, fn) {
  this.api.send(this.endpoint + '/register', 'PUT', params, fn);
  return this;
};

/**
 * Delete a contact.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Contact} this
 * @public
 */
Contact.prototype.delete = function cancel(params, fn) {
  this.api.send(this.endpoint + '/delete', 'DELETE', params, fn);
  return this;
};

/**
 * Get info on specific contacts.
 *
 * @param {Object} params Parameters
 * @param {Function} fn Callback
 * @return {Contact} this
 * @public
 */
Contact.prototype.getinfo = function getinfo(params, fn) {
  this.api.send(this.endpoint + '/getinfo', 'GET', params, fn);
  return this;
};

/**
 * List contacts under account.
 *
 * @param {Object} [params] Parameters
 * @param {Function} fn Callback
 * @return {Contact} this
 * @public
 */
Contact.prototype.list = function list(params, fn) {
  if (typeof params === 'function') {
    fn = params;
    params = {};
  }
  this.api.send(this.endpoint + '/list', 'GET', params, fn);
  return this;
};

module.exports = Contact;
