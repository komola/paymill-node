var api_key = '66748d6d3d0d36c819560088b9f817d7';  // secret paymill
var paymill = require('../lib/main')(api_key);
var nock = require('nock');
var paymillHost = 'https://api.paymill.de';

QUnit.module('create preauthorization');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var preauthorization = {};
    nock(paymillHost).post('/v2/preauthorizations').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.preauthorizations.create(preauthorization, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var preauthorization = {};
    nock(paymillHost).post('/v2/preauthorizations').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.preauthorizations.create(preauthorization, cb);
    stop();
  });

QUnit.module('preauthorization details');

  test('It should throw a TypeError if the preauthorization_id is not a string', function(){
    // prepare env
    var preauthorization_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.preauthorizations.details(preauthorization_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    preauthorization_id = 1;

    // execute
    fn = function (){
      paymill.preauthorizations.details(preauthorization_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    preauthorization_id = function(){};

    // execute
    fn = function (){
      paymill.preauthorizations.details(preauthorization_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var preauthorization_id = 'testID';
    nock(paymillHost).get('/v2/preauthorizations/' + preauthorization_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.preauthorizations.details(preauthorization_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var preauthorization_id = 'testID';
    nock(paymillHost).get('/v2/preauthorizations/' + preauthorization_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.preauthorizations.details(preauthorization_id, cb);
    stop();
  });

QUnit.module('list preauthorizations');

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/preauthorizations').reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.preauthorizations.list(data, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var data = {};
    nock(paymillHost).get('/v2/preauthorizations').reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.preauthorizations.list(data, cb);
    stop();
  });

QUnit.module('remove preauthorization');

  test('It should throw a TypeError if the preauthorization_id is not a string', function(){
    // prepare env
    var preauthorization_id = {};
    var cb = function(){};

    // execute
    var fn = function (){
      paymill.preauthorizations.remove(preauthorization_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    preauthorization_id = 1;

    // execute
    fn = function (){
      paymill.preauthorizations.remove(preauthorization_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');

    // prepare env
    preauthorization_id = function(){};

    // execute
    fn = function (){
      paymill.preauthorizations.remove(preauthorization_id, cb);
    };

    // verify
    throws(fn, TypeError, 'raised Error is instance of TypeError');
  });

  test('It should call the callback with an Error object if the response status is not 200', function(){
    // prepare env
    var preauthorization_id = 'testID';
    nock(paymillHost).delete('/v2/preauthorizations/' + preauthorization_id).reply(500,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err, 'err should not be undefined nor null');
      ok(response === null, 'response should be null');
      start();
    };

    // execute
    paymill.preauthorizations.remove(preauthorization_id, cb);
    stop();
  });

  test('It should call the callback with null Error and the response if all went ok (status 200)', function(){
    // prepare env
    var preauthorization_id = 'testID';
    nock(paymillHost).delete('/v2/preauthorizations/' + preauthorization_id).reply(200,{});
    expect(2);

    // verify
    var cb = function(err, response) {
      ok(err === null, 'err should be null');
      ok(response !== null, 'response should not be null');
      start();
    };

    // execute
    paymill.preauthorizations.remove(preauthorization_id, cb);
    stop();
  });
