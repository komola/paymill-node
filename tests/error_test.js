var api_key = '66748d6d3d0d36c819560088b9f817d7';  // secret paymill
var paymill = require('../lib/main')(api_key);
var nock = require('nock');
var paymillHost = 'https://api.paymill.de';

QUnit.module('error response handling');

  test('It should return `body.data.response_code.error` as error message, if it exists.', function(){
    // prepare env
    var payment = {};
    nock(paymillHost).post('/v2/payments').reply(500, {
      data: {
        response_code: {
          error: 'Some error message.'
        }
      }
    });
    expect(1);

    // verify
    var cb = function(err, response) {
      strictEqual(err.message, 'Some error message.');
      start();
    };

    // execute
    paymill.payments.create(payment, cb);
    stop();
  });

  test('It should map the numeric error code to a message.', function(){
    // prepare env
    var payment = {};
    nock(paymillHost).post('/v2/payments').reply(500, {
      data: {
        response_code: 10001
      }
    });
    expect(1);

    // verify
    var cb = function(err, response) {
      strictEqual(err.message, 'General undefined response.');
      start();
    };

    // execute
    paymill.payments.create(payment, cb);
    stop();
  });

  test('It should return `body.error` as error message, if it exists.', function(){
    // prepare env
    var payment = {};
    nock(paymillHost).post('/v2/payments').reply(500, {
      error: 'Some error message.'
    });
    expect(1);

    // verify
    var cb = function(err, response) {
      strictEqual(err.message, 'Some error message.');
      start();
    };

    // execute
    paymill.payments.create(payment, cb);
    stop();
  });

  test('It should extract and return an error message from a nested `body.error` array, if it exists.', function(){
    // prepare env
    var payment = {};
    nock(paymillHost).post('/v2/payments').reply(500, {
      error: [
        [
          [
            'Some error message.'
          ]
        ]
      ]
    });
    expect(1);

    // verify
    var cb = function(err, response) {
      strictEqual(err.message, 'Some error message.');
      start();
    };

    // execute
    paymill.payments.create(payment, cb);
    stop();
  });
