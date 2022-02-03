describe('Freenom#transfer', function () {
  'use strict';

  var expect = require('chai').expect
    , common = require('./common')
    , qs = require('querystring')
    , Freenom = require('..')
    , nock = require('nock');

  var scope = nock('https://api.freenom.com/v1/domain/transfer')
    , freenom = new Freenom(common.email, common.password);

  it('gets the price of a domain transfer', function (done) {
    var params = { domainname: 'test002.tk', authcode: '7738977ABCDF889001' };
    var result = { result: 'PRICES PROVIDED' };

    scope
    .get('/price?' + common.stringify(params))
    .reply(200, result);

    freenom.transfer.price(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('requests a domain transfer', function (done) {
    var params = {
      authcode: '7738977ABCDF889001',
      domainname: 'test002.tk',
      owner_id: 'JSMITH001',
      period: '1Y'
    };
    var result = { result: 'TRANSFER REQUESTED' };

    scope
    .post('/request', common.stringify(params))
    .reply(200, result);

    freenom.transfer.request(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('approves a domain transfer', function (done) {
    var params = { domainname: 'test002.tk' };
    var result = { result: 'TRANSFER APPROVED' };

    scope
    .post('/approve', common.stringify(params))
    .reply(200, result);

    freenom.transfer.approve(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('declines a domain transfer', function (done) {
    var params = { domainname: 'test002.tk', reason: 'no_payment' };
    var result = { result: 'TRANSFER DECLINED' };

    scope
    .post('/decline', common.stringify(params))
    .reply(200, result);

    freenom.transfer.decline(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('lists all domain transfers (1/2)', function (done) {
    var result = { result: '2 TRANSFERS LISTED' };

    scope
    .get('/list?' + common.stringify())
    .reply(200, result);

    freenom.transfer.list(function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('lists all domain transfers (2/2)', function (done) {
    var params = { email: 'john@doe.com', password: 'tieGhei4qu' };
    var result = { result: '2 TRANSFERS LISTED' };

    scope
    .get('/list?' + qs.stringify(params))
    .reply(200, result);

    freenom.transfer.list(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });
});
