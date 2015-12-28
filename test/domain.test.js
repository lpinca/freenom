describe('Freenom#domain', function () {
  'use strict';

  var common = require('./common')
    , assert = require('assert')
    , Freenom = require('..')
    , nock = require('nock');

  var freenom = new Freenom(common.email, common.password)
    , scope = nock('https://api.freenom.com/v2/domain');

  it('searches a domain for availability', function (done) {
    var params = { domainname: 'test001.tk', domaintype: 'FREE' };
    var result = { result: 'DOMAIN AVAILABLE' };

    scope
    .get('/search?' + common.stringify(params))
    .reply(200, result);

    freenom.domain.search(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('registers a domain', function (done) {
    var params = {
      nameserver: [ 'ns1.test001.tk', 'ns2.test001.tk' ],
      domainname: 'test001.tk',
      owner_id: 'JSMTH01',
      domaintype: 'PAID',
      period: '2Y'
    };
    var result = { result: 'DOMAIN REGISTERED' };

    scope
    .post('/register', common.stringify(params))
    .reply(201, result);

    freenom.domain.register(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('renews a domain', function (done) {
    var params = { domainname: 'test001.tk', period: '2Y' };
    var result = { result: 'DOMAIN RENEWED' };

    scope
    .post('/renew', common.stringify(params))
    .reply(201, result);

    freenom.domain.renew(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('retrieves info about a domain', function (done) {
    var params = { domainname: 'test002.tk' };
    var result = { result: 'DOMAIN LISTED' };

    scope
    .get('/getinfo?' + common.stringify(params))
    .reply(200, result);

    freenom.domain.getinfo(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('modifies a domain', function (done) {
    var params = { domainname: 'test002.tk', forward_url: 'http://example.com' };
    var result = { result: 'DOMAIN MODIFIED' };

    scope
    .put('/modify', common.stringify(params))
    .reply(200, result);

    freenom.domain.modify(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('deletes a domain', function (done) {
    var params = { domainname: 'test002.tk' };
    var result = { result: 'DOMAIN DELETED' };

    scope
    .delete('/delete', common.stringify(params))
    .reply(200, result);

    freenom.domain.delete(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('restores a domain', function (done) {
    var params = { domainname: 'test002.tk' };
    var result = { result: 'DOMAIN RESTORED' };

    scope
    .post('/restore', common.stringify(params))
    .reply(201, result);

    freenom.domain.restore(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('upgrades a domain', function (done) {
    var params = {
      domainname: 'test002.tk',
      idshield: 'disabled',
      owner_id: 'SMTH23'
    };
    var result = { result: 'DOMAIN UPGRADED' };

    scope
    .post('/upgrade', common.stringify(params))
    .reply(201, result);

    freenom.domain.upgrade(params, function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });

  it('lists all domains under the account', function (done) {
    var result = { result: '2 DOMAINS FOUND' };

    scope
    .get('/list?' + common.stringify())
    .reply(200, result);

    freenom.domain.list(function (err, res) {
      if (err) return done(err);

      assert.deepStrictEqual(res, result);
      done();
    });
  });
});
