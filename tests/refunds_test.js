var api_key = '66748d6d3d0d36c819560088b9f817d7';  // secret paymill
var paymill = require('../lib/main')(api_key);
var nock = require('nock');
var paymillHost = 'https://api.paymill.de';

QUnit.module('refunds refund');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var transaction_id = 'testID';
    var ammount = 1;
    var description = 'someDescription';
    nock(paymillHost).post('/v2/refunds/' + transaction_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.refunds.refund(transaction_id, ammount, description, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var transaction_id = 'testID';
    var ammount = 1;
    var description = 'someDescription';
    nock(paymillHost).post('/v2/refunds/' + transaction_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.refunds.refund(transaction_id, ammount, description, cb);
    stop();
  });

QUnit.module('refund details');

  test('It should throw a TypeError if the refund_id is not a string', function(){
    // prepare env
    var refund_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.refunds.details(refund_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    refund_id = 1;

    // execute
    fn = function (){
      paymill.refunds.details(refund_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    refund_id = function(){};

    // execute
    fn = function (){
      paymill.refunds.details(refund_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var refund_id = 'testID';
    nock(paymillHost).get('/v2/refunds/' + refund_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.refunds.details(refund_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var refund_id = 'testID';
    nock(paymillHost).get('/v2/refunds/' + refund_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.refunds.details(refund_id, cb);
    stop();
  });

QUnit.module('list refunds');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/refunds').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.refunds.list(data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/refunds').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.refunds.list(data, cb);
    stop();
  });
