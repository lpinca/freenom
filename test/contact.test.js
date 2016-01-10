describe('Freenom#contact', function () {
  'use strict';

  var expect = require('chai').expect
    , common = require('./common')
    , qs = require('querystring')
    , Freenom = require('..')
    , nock = require('nock');

  var freenom = new Freenom(common.email, common.password)
    , scope = nock('https://api.freenom.com/v2/contact');

  it('creates a new contact', function (done) {
    var params = {
      contact_firstname: 'John',
      contact_lastname: 'Smith',
      contact_organization: 'A-Team',
      contact_address: 'Main Road 1',
      contact_city: 'Los Angeles',
      contact_zipcode: 90001,
      contact_statecode: 'US-CA',
      contact_countrycode: 'US',
      contact_phone: '+1-310-123456',
      contact_email: 'hannibal@a-team.tk'
    };
    var result = { result: 'CONTACT REGISTERED' };

    scope
    .put('/register', common.stringify(params))
    .reply(200, result);

    freenom.contact.register(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('deletes a contact', function (done) {
    var params = { contact_id: 8837012 };
    var result = { result: 'CONTACT DELETED' };

    scope
    .delete('/delete', common.stringify(params))
    .reply(200, result);

    freenom.contact.delete(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('retrieves info on specific contacts', function (done) {
    var params = { contact_id: 8837012 };
    var result = { result: 'CONTACTS LISTED' };

    scope
    .get('/getinfo?' + common.stringify(params))
    .reply(200, result);

    freenom.contact.getinfo(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('lists all contacts under the account (1/2)', function (done) {
    var result = { result: 'CONTACTS LISTED' };

    scope
    .get('/list?' + common.stringify())
    .reply(200, result);

    freenom.contact.list(function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });

  it('lists all contacts under the account (2/2)', function (done) {
    var params = { email: 'john@doe.com', password: 'tieGhei4qu' };
    var result = { result: 'CONTACTS LISTED' };

    scope
    .get('/list?' + qs.stringify(params))
    .reply(200, result);

    freenom.contact.list(params, function (err, res) {
      if (err) return done(err);

      expect(res).to.deep.equal(result);
      done();
    });
  });
});
