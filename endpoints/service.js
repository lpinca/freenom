'use strict';

/**
 * Service resource.
 *
 * @param {Freenom} api Reference to the Freenom instance.
 * @constructor
 * @private
 */
function Service(api) {
  this.endpoint = api.baseUrl + '/service';
  this.api = api;
}

/**
 * Ping the service.
 *
 * @param {Function} fn Callback
 * @return {Service} this
 * @public
 */
Service.prototype.ping = function(fn) {
  this.api.send(this.endpoint + '/ping', 'GET', null, fn);
  return this;
};

module.exports = Service;
