describe('Freenom#service', function () {
  'use strict';

  var expect = require('chai').expect
    , common = require('./common')
    , Freenom = require('..')
    , nock = require('nock');

  var freenom = new Freenom(common.email, common.password)
    , scope = nock('https://api.freenom.com/v2/service');

  it('pings the service', function (done) {
    var result = { result: 'PING REPLY' };

    scope
    .get('/ping')
    .reply(200, result);

    freenom.service.ping(function (err, res) {
      if (err) return done(err);

      expect(res).to.eql(result);
      done();
    });
  });
});
