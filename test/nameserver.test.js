describe('Freenom#nameserver', function () {
  'use strict';

  var expect = require('chai').expect
    , common = require('./common')
    , Freenom = require('..')
    , nock = require('nock');

  var freenom = new Freenom(common.email, common.password)
    , scope = nock('https://api.freenom.com/v2/nameserver');

  it('registers a nameserver glue record', function (done) {
    var params = {
      hostname: 'ns1.test002.tk',
      ipaddress: '192.168.1.2',
      domainname: 'test002.tk'
    };
    var result = { result: 'NAMESERVER REGISTERED' };

    scope
    .put('/register', common.stringify(params))
    .reply(200, result);

    freenom.nameserver.register(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('deletes a nameserver glue record', function (done) {
    var params = { domainname: 'test002.tk', hostname: 'ns1.test002.tk' };
    var result = { result: 'NAMESERVER DELETED' };

    scope
    .delete('/delete', common.stringify(params))
    .reply(200, result);

    freenom.nameserver.delete(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('lists all nameserver glue records under a domain', function (done) {
    var params = { domainname: 'test002.tk' };
    var result = { result: '2 ENTRIES' };

    scope
    .get('/list?' + common.stringify(params))
    .reply(200, result);

    freenom.nameserver.list(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });
});
