var api_key = '66748d6d3d0d36c819560088b9f817d7';  // secret paymill
var paymill = require('../lib/main')(api_key);
var nock = require('nock');
var paymillHost = 'https://api.paymill.de';

QUnit.module('create offer');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var offer = {};
    nock(paymillHost).post('/v2/offers').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.offers.create(offer, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var offer = {};
    nock(paymillHost).post('/v2/offers').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.offers.create(offer, cb);
    stop();
  });

QUnit.module('offer details');

  test('It should throw a TypeError if the offer_id is not a string', function(){
    // prepare env
    var offer_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.offers.details(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    offer_id = 1;

    // execute
    fn = function (){
      paymill.offers.details(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    offer_id = function(){};

    // execute
    fn = function (){
      paymill.offers.details(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var offer_id = 'testID';
    nock(paymillHost).get('/v2/offers/' + offer_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.offers.details(offer_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var offer_id = 'testID';
    nock(paymillHost).get('/v2/offers/' + offer_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.offers.details(offer_id, cb);
    stop();
  });

QUnit.module('update offer');

  test('It should throw a TypeError if the offer_id is not a string', function(){
    // prepare env
    var offer_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.offers.details(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    offer_id = 1;

    // execute
    fn = function (){
      paymill.offers.details(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    offer_id = function(){};

    // execute
    fn = function (){
      paymill.offers.update(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var offer_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/offers/' + offer_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.offers.update(offer_id, data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var offer_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/offers/' + offer_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.offers.update(offer_id, data, cb);
    stop();
  });

QUnit.module('list offers');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/offers').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.offers.list(data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/offers').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.offers.list(data, cb);
    stop();
  });

QUnit.module('remove offer');

  test('It should throw a TypeError if the offer_id is not a string', function(){
    // prepare env
    var offer_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.offers.remove(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    offer_id = 1;

    // execute
    fn = function (){
      paymill.offers.remove(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    offer_id = function(){};

    // execute
    fn = function (){
      paymill.offers.remove(offer_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var offer_id = 'testID';
    nock(paymillHost).delete('/v2/offers/' + offer_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.offers.remove(offer_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var offer_id = 'testID';
    nock(paymillHost).delete('/v2/offers/' + offer_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.offers.remove(offer_id, cb);
    stop();
  });
