var api_key = '66748d6d3d0d36c819560088b9f817d7';  // secret paymill
var paymill = require('../lib/main')(api_key);
var nock = require('nock');
var paymillHost = 'https://api.paymill.de';

QUnit.module('create webhook');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var webhook = {};
    nock(paymillHost).post('/v2/webhooks').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.webhooks.create(webhook, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var webhook = {};
    nock(paymillHost).post('/v2/webhooks').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.webhooks.create(webhook, cb);
    stop();
  });

QUnit.module('webhook details');

  test('It should throw a TypeError if the webhook_id is not a string', function(){
    // prepare env
    var webhook_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.webhooks.details(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    webhook_id = 1;

    // execute
    fn = function (){
      paymill.webhooks.details(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    webhook_id = function(){};

    // execute
    fn = function (){
      paymill.webhooks.details(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var webhook_id = 'testID';
    nock(paymillHost).get('/v2/webhooks/' + webhook_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.webhooks.details(webhook_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var webhook_id = 'testID';
    nock(paymillHost).get('/v2/webhooks/' + webhook_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.webhooks.details(webhook_id, cb);
    stop();
  });

QUnit.module('update webhook');

  test('It should throw a TypeError if the webhook_id is not a string', function(){
    // prepare env
    var webhook_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.webhooks.details(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    webhook_id = 1;

    // execute
    fn = function (){
      paymill.webhooks.details(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    webhook_id = function(){};

    // execute
    fn = function (){
      paymill.webhooks.update(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var webhook_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/webhooks/' + webhook_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.webhooks.update(webhook_id, data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var webhook_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/webhooks/' + webhook_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.webhooks.update(webhook_id, data, cb);
    stop();
  });

QUnit.module('list webhooks');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/webhooks').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.webhooks.list(data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/webhooks').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.webhooks.list(data, cb);
    stop();
  });

QUnit.module('remove webhook');

  test('It should throw a TypeError if the webhook_id is not a string', function(){
    // prepare env
    var webhook_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.webhooks.remove(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    webhook_id = 1;

    // execute
    fn = function (){
      paymill.webhooks.remove(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    webhook_id = function(){};

    // execute
    fn = function (){
      paymill.webhooks.remove(webhook_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var webhook_id = 'testID';
    nock(paymillHost).delete('/v2/webhooks/' + webhook_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.webhooks.remove(webhook_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var webhook_id = 'testID';
    nock(paymillHost).delete('/v2/webhooks/' + webhook_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.webhooks.remove(webhook_id, cb);
    stop();
  });
