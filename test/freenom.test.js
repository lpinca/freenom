describe('Freenom', function () {
  'use strict';

  var endpoints = require('../endpoints')
    , expect = require('chai').expect
    , common = require('./common')
    , qs = require('querystring')
    , Freenom = require('..')
    , nock = require('nock');

  it('exports the constructor', function () {
    expect(Freenom).to.be.a('function');
  });

  it('instantiates the endpoints lazily', function () {
    var freenom = new Freenom()
      , endpoint;

    expect(freenom._domain).to.equal(undefined);

    endpoint = freenom.domain;

    expect(freenom._domain).to.equal(endpoint);
    expect(freenom.domain).to.equal(endpoint);
  });

  it('allows to manually instantiate an endpoint', function () {
    var freenom = new Freenom()
      , endpoint = new endpoints.Service(freenom);

    expect(freenom._domain).to.equal(undefined);

    freenom.domain = endpoint;

    expect(freenom._domain).to.equal(endpoint);
    expect(freenom.domain).to.equal(endpoint);
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

      expect(res).to.eql(result);
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
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal(message);
      expect(res).to.equal(undefined);
      done();
    });
  });

  it('returns an error if it fails to parse the response body', function (done) {
    var freenom = new Freenom();

    nock('https://api.freenom.com/v2/service')
    .get('/ping')
    .reply(500, '<!DOCTYPE html><html><head></head><body></body></html>');

    freenom.service.ping(function (err, res) {
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('Failed to parse the response body');
      expect(res).to.equal(undefined);
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
      expect(err).to.be.an.instanceof(Error);
      expect(err.message).to.equal('Invalid domainname');
      expect(res).to.eql(undefined);
      done();
    });
  });
});
