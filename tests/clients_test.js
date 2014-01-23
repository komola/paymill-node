var api_key = '66748d6d3d0d36c819560088b9f817d7';  // secret paymill
var paymill = require('../lib/main')(api_key);
var nock = require('nock');
var paymillHost = 'https://api.paymill.de';

QUnit.module('create client');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var client = {};
    nock(paymillHost).post('/v2/clients').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.clients.create(client, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var client = {};
    nock(paymillHost).post('/v2/clients').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.clients.create(client, cb);
    stop();
  });

QUnit.module('payment details');

  test('It should throw a TypeError if the client_id is not a string', function(){
    // prepare env
    var client_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.clients.details(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    client_id = 1;

    // execute
    fn = function (){
      paymill.clients.details(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    client_id = function(){};

    // execute
    fn = function (){
      paymill.clients.details(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var client_id = 'testID';
    nock(paymillHost).get('/v2/clients/' + client_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.clients.details(client_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var client_id = 'testID';
    nock(paymillHost).get('/v2/clients/' + client_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.clients.details(client_id, cb);
    stop();
  });

QUnit.module('update client');

  test('It should throw a TypeError if the client_id is not a string', function(){
    // prepare env
    var client_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.clients.details(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    client_id = 1;

    // execute
    fn = function (){
      paymill.clients.details(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    client_id = function(){};

    // execute
    fn = function (){
      paymill.clients.update(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var client_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/clients/' + client_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.clients.update(client_id, data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var client_id = 'testID';
    var data = {};
    nock(paymillHost).put('/v2/clients/' + client_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.clients.update(client_id, data, cb);
    stop();
  });

QUnit.module('list clients');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/clients').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.clients.list(data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/clients').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.clients.list(data, cb);
    stop();
  });

QUnit.module('remove client');

  test('It should throw a TypeError if the client_id is not a string', function(){
    // prepare env
    var client_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.clients.remove(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    client_id = 1;

    // execute
    fn = function (){
      paymill.clients.remove(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    client_id = function(){};

    // execute
    fn = function (){
      paymill.clients.remove(client_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var client_id = 'testID';
    nock(paymillHost).delete('/v2/clients/' + client_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.clients.remove(client_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var client_id = 'testID';
    nock(paymillHost).delete('/v2/clients/' + client_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.clients.remove(client_id, cb);
    stop();
  });
