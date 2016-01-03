describe('Freenom', function () {
  'use strict';

  var endpoints = require('../endpoints')
    , common = require('./common')
    , qs = require('querystring')
    , assert = require('assert')
    , Freenom = require('..')
    , nock = require('nock');

  it('exports the constructor', function () {
    assert.ok(typeof Freenom === 'function');
  });

  it('makes the new operator optional', function () {
    assert.ok(Freenom() instanceof Freenom);
  });

  it('instantiates the endpoints lazily', function () {
    var freenom = new Freenom()
      , endpoint;

    assert.strictEqual(freenom._domain, undefined);

    endpoint = freenom.domain;

    assert.strictEqual(freenom._domain, endpoint);
    assert.strictEqual(freenom.domain, endpoint);
  });

  it('allows to manually instantiate an endpoint', function () {
    var freenom = new Freenom()
      , endpoint = new endpoints.Service(freenom);

    assert.strictEqual(freenom._domain, undefined);

    freenom.domain = endpoint;

    assert.strictEqual(freenom._domain, endpoint);
    assert.strictEqual(freenom.domain, endpoint);
  });

  it('allows to specify authentication credentials as parameters', function (done) {
    var freenom = new Freenom(common.email, common.password)
      , params = { email: 'john@doe.com', password: 'tieGhei4qu' }
      , result = { result: '2 DOMAINS FOUND' };

    nock('https://api.freenom.com/v2/domain')
    .get('/list?' + qs.stringify(params))
    .reply(200, result);

    freenom.domain.list(params, function (err, res) {
      if (err) return done(err);

      assert.deepEqual(res, result);
      done();
    });
  });

  it('returns an error if the request fails', function (done) {
    var message = 'Something wrong happened'
      , freenom = new Freenom();

    nock('https://api.freenom.com/v2/service')
    .get('/ping')
    .replyWithError(message);

    freenom.service.ping(function (err, res) {
      assert.ok(err instanceof Error);
      assert.strictEqual(err.message, message);
      assert.strictEqual(res, undefined);
      done();
    });
  });

  it('returns an error if it fails to parse the response body', function (done) {
    var freenom = new Freenom();

    nock('https://api.freenom.com/v2/service')
    .get('/ping')
    .reply(500, '<!DOCTYPE html><html><head></head><body></body></html>');

    freenom.service.ping(function (err, res) {
      assert.ok(err instanceof Error);
      assert.strictEqual(err.message, 'Failed to parse the response body');
      assert.strictEqual(res, undefined);
      done();
    });
  });

  it('returns an error if the response body represents an error', function (done) {
    var params = { domainname: '------.tk', domaintype: 'PAID' };
    var freenom = new Freenom(common.email, common.password);

    nock('https://api.freenom.com/v2/domain')
    .get('/search?' + common.stringify(params))
    .reply(200, { status: 'error', error: 'Invalid domainname' });

    freenom.domain.search(params, function (err, res) {
      assert.ok(err instanceof Error);
      assert.strictEqual(err.message, 'Invalid domainname');
      assert.strictEqual(res, undefined);
      done();
    });
  });
});
