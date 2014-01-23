var api_key = '66748d6d3d0d36c819560088b9f817d7';  // secret paymill
var paymill = require('../lib/main')(api_key);
var nock = require('nock');
var paymillHost = 'https://api.paymill.de';

QUnit.module('create subscription');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var subscription = {};
    nock(paymillHost).post('/v2/subscriptions').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.subscriptions.create(subscription, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var subscription = {};
    nock(paymillHost).post('/v2/subscriptions').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.subscriptions.create(subscription, cb);
    stop();
  });

QUnit.module('subscription details');

  test('It should throw a TypeError if the subscription_id is not a string', function(){
    // prepare env
    var subscription_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.subscriptions.details(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    subscription_id = 1;

    // execute
    fn = function (){
      paymill.subscriptions.details(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    subscription_id = function(){};

    // execute
    fn = function (){
      paymill.subscriptions.details(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var subscription_id = 'testID';
    nock(paymillHost).get('/v2/subscriptions/' + subscription_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.subscriptions.details(subscription_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var subscription_id = 'testID';
    nock(paymillHost).get('/v2/subscriptions/' + subscription_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.subscriptions.details(subscription_id, cb);
    stop();
  });

QUnit.module('update subscription');

  test('It should throw a TypeError if the subscription_id is not a string', function(){
    // prepare env
    var subscription_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.subscriptions.details(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    subscription_id = 1;

    // execute
    fn = function (){
      paymill.subscriptions.details(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    subscription_id = function(){};

    // execute
    fn = function (){
      paymill.subscriptions.update(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var subscription_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/subscriptions/' + subscription_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.subscriptions.update(subscription_id, data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var subscription_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/subscriptions/' + subscription_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.subscriptions.update(subscription_id, data, cb);
    stop();
  });

QUnit.module('list subscriptions');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/subscriptions').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.subscriptions.list(data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/subscriptions').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.subscriptions.list(data, cb);
    stop();
  });

QUnit.module('remove subscription');

  test('It should throw a TypeError if the subscription_id is not a string', function(){
    // prepare env
    var subscription_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.subscriptions.remove(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    subscription_id = 1;

    // execute
    fn = function (){
      paymill.subscriptions.remove(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    subscription_id = function(){};

    // execute
    fn = function (){
      paymill.subscriptions.remove(subscription_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var subscription_id = 'testID';
    nock(paymillHost).delete('/v2/subscriptions/' + subscription_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.subscriptions.remove(subscription_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var subscription_id = 'testID';
    nock(paymillHost).delete('/v2/subscriptions/' + subscription_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.subscriptions.remove(subscription_id, cb);
    stop();
  });
