/* Copyright 2011 Ask Bjørn Hansen, see LICENSE */
/* Copyright 2012 Sebastian Hoitz, Thomas Schaaf, see LICENSE */
'use strict';

var util = require('util');
var https = require('https');
var querystring = require('querystring');

var ERROR_MESSAGES = {
  10001: 'General undefined response.',
  10002: 'Still waiting on something.',
  20000: 'General success response.',
  40000: 'General problem with data.',
  40001: 'General problem with payment data.',
  40100: 'Problem with credit card data.',
  40101: 'Problem with cvv.',
  40102: 'Card expired or not yet valid.',
  40103: 'Limit exceeded.',
  40104: 'Card invalid.',
  40105: 'Expiry date not valid.',
  40106: 'Credit card brand required.',
  40200: 'Problem with bank account data.',
  40201: 'Bank account data combination mismatch.',
  40202: 'User authentication failed.',
  40300: 'Problem with 3d secure data.',
  40301: 'Currency / amount mismatch',
  40400: 'Problem with input data.',
  40401: 'Amount too low or zero.',
  40402: 'Usage field too long.',
  40403: 'Currency not allowed.',
  50000: 'General problem with backend.',
  50001: 'Country blacklisted.',
  50100: 'Technical error with credit card.',
  50101: 'Error limit exceeded.',
  50102: 'Card declined by authorization system.',
  50103: 'Manipulation or stolen card.',
  50104: 'Card restricted.',
  50105: 'Invalid card configuration data.',
  50200: 'Technical error with bank account.',
  50201: 'Card blacklisted.',
  50300: 'Technical error with 3D secure.',
  50400: 'Decline because of risk issues.',
  50500: 'General timeout.',
  50501: 'Timeout on side of the acquirer.',
  50502: 'Risk management transaction timeout.',
  50600: 'Duplicate transaction.'
};

function get_error_message_from_response(response) {
  var response_code = response.data && response.data.response_code;
  var error_message = 'Undefined Error. This should not happen!';

  if(response_code && response_code.error) {
    error_message = response_code.error;
  }
  else if(ERROR_MESSAGES[response_code]) {
    error_message = ERROR_MESSAGES[response_code];
  } else {
    //The response contains
    if(response.error) {
      if(util.isArray(response.error)) {
        error_message = get_error_message_from_array(response.error);
      } else {
        error_message = response.error;
      }
    }
  }

  return error_message;
}

function get_error_message_from_array(error_array) {
  var error_message = error_array.shift();

  if(util.isArray(error_message)) {
    return get_error_message_from_array(error_message);
  } else {
    return error_message;
  }
}

function setup_response_handler(req, callback) {
  req.on('response',
    function(res) {
      var response = '';
      res.setEncoding('utf8');
      res.on('data',
        function(chunk) {
          response += chunk;
      });
      res.on('end',
        function() {
          var err = null;
          try {
            response = JSON.parse(response);
            if(res.statusCode !== 200) {
              err = new Error(get_error_message_from_response(response));
              err.response = response;
              response = null;
            }
          }
          catch(e) {
            err = new Error('Invalid JSON from paymill.com');
            response = null;
          }
          callback(err, response);
      });
    });
  req.on('error',
    function(err){
      callback(err, null);
    });
}

module.exports = function (api_key) {
  var auth = 'Basic ' + new Buffer(api_key + ':').toString('base64');

  function _request(method, path, data, callback) {

    // convert first level of deep data structures to foo[bar]=baz syntax
    Object.keys(data).forEach(function(key) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        var o = data[key];
        delete data[key];
        Object.keys(o).forEach(function(k) {
          var new_key = key + '[' + k + ']';
          data[new_key] = o[k];
        });
      }
    });

    if (method === 'GET' && Object.keys(data).length > 0) {
      path += '?' + querystring.stringify(data);
      data = {};
    }

    var request_data = querystring.stringify(data);

    var request_options = {
       host: 'api.paymill.de',
       port: '443',
       path: path,
       method: method,
       headers: {
         'Authorization': auth,
         'Accept': 'application/json',
         'Content-Type': 'application/x-www-form-urlencoded',
         'Content-Length': request_data.length
       }
     };

    var req = https.request(request_options);
    if (typeof callback === 'function'){
      setup_response_handler(req, callback);
    }
    req.write(request_data);
    req.end();
  }

  function post(path, data, callback) {
    _request('POST', path, data, callback);
  }

  function get(path, data, callback) {
    _request('GET', path, data, callback);
  }

  function del(path, data, callback) {
    _request('DELETE', path, data, callback);
  }

  function put(path, data, callback) {
    _request('PUT', path, data, callback);
  }

  return {
    payments: {
      create: function(payment, cb) {
        post('/v2/payments', payment, cb);
      },
      details: function(payment_id, cb) {
        if (typeof payment_id !== 'string') {
          throw new TypeError('payment_id must be a string');
        }
        get('/v2/payments/' + payment_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/payments', data, cb);
      },
      remove: function(payment_id, cb) {
        if (typeof payment_id !== 'string') {
          throw new TypeError('payment_id must be a string');
        }
        del('/v2/payments/' + payment_id, {}, cb);
      }
    },
    preauthorizations: {
      create: function(preauthorization, cb) {
        post('/v2/preauthorizations', preauthorization, cb);
      },
      details: function(preauthorization_id, cb) {
        if (typeof preauthorization_id !== 'string') {
          throw new TypeError('preauthorization_id must be a string');
        }
        get('/v2/preauthorizations/' + preauthorization_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/preauthorizations', data, cb);
      },
      remove: function(preauthorization_id, cb) {
        if (typeof preauthorization_id !== 'string') {
          throw new TypeError('preauthorization_id must be a string');
        }
        del('/v2/preauthorizations/' + preauthorization_id, {}, cb);
      }
    },
    transactions: {
      create: function(transaction, cb) {
        post('/v2/transactions', transaction, cb);
      },
      details: function(transaction_id, cb) {
        if (typeof transaction_id !== 'string') {
          throw new TypeError('transaction_id must be a string');
        }
        get('/v2/transactions/' + transaction_id, {}, cb);
      },
      update: function(transaction_id, data, cb) {
        put("/v2/transactions/" + transaction_id, data, cb);
      },
      list: function(data, cb) {
        get('/v2/transactions', data, cb);
      }
    },
    refunds: {
      refund: function(transaction_id, amount, description, cb) {
        post('/v2/refunds/' + transaction_id, {amount: amount, description: description}, cb);
      },
      details: function(refund_id, cb) {
        if (typeof refund_id !== 'string') {
          throw new TypeError('refund_id must be a string');
        }
        get('/v2/refunds/' + refund_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/refunds', data, cb);
      }
    },
    clients: {
      create: function(client, cb) {
        post('/v2/clients', client, cb);
      },
      details: function(client_id, cb) {
        if (typeof client_id !== 'string') {
          throw new TypeError('client_id must be a string');
        }
        get('/v2/clients/' + client_id, {}, cb);
      },
      update: function(client_id, data, cb) {
        if (typeof client_id !== 'string') {
          throw new TypeError('client_id must be a string');
        }
        put('/v2/clients/' + client_id, data, cb);
      },
      remove: function(client_id, cb) {
        if (typeof client_id !== 'string') {
          throw new TypeError('client_id must be a string');
        }
        del('/v2/clients/' + client_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/clients', data, cb);
      }
    },
    offers: {
      create: function(offer, cb) {
        post('/v2/offers', offer, cb);
      },
      details: function(offer_id, cb) {
        if (typeof offer_id !== 'string') {
          throw new TypeError('offer_id must be a string');
        }
        get('/v2/offers/' + offer_id, {}, cb);
      },
      update: function(offer_id, data, cb) {
        if (typeof offer_id !== 'string') {
          throw new TypeError('offer_id must be a string');
        }
        put('/v2/offers/' + offer_id, data, cb);
      },
      remove: function(offer_id, cb) {
        if (typeof offer_id !== 'string') {
          throw new TypeError('offer_id must be a string');
        }
        del('/v2/offers/' + offer_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/offers', data, cb);
      }
    },
    subscriptions: {
      create: function(subscription, cb) {
        post('/v2/subscriptions', subscription, cb);
      },
      details: function(subscription_id, cb) {
        if (typeof subscription_id !== 'string') {
          throw new TypeError('subscription_id must be a string');
        }
        get('/v2/subscriptions/' + subscription_id, {}, cb);
      },
      update: function(subscription_id, data, cb) {
        if (typeof subscription_id !== 'string') {
          throw new TypeError('subscription_id must be a string');
        }
        put('/v2/subscriptions/' + subscription_id, data, cb);
      },
      remove: function(subscription_id, cb) {
        if (typeof subscription_id !== 'string') {
          throw new TypeError('subscription_id must be a string');
        }
        del('/v2/subscriptions/' + subscription_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/subscriptions', data, cb);
      }
    },
    webhooks: {
      create: function(webhook, cb) {
        post('/v2/webhooks', webhook, cb);
      },
      details: function(webhook_id, cb) {
        if (typeof webhook_id !== 'string') {
          throw new TypeError('webhook_id must be a string');
        }
        get('/v2/webhooks/' + webhook_id, {}, cb);
      },
      update: function(webhook_id, data, cb) {
        if (typeof webhook_id !== 'string') {
          throw new TypeError('webhook_id must be a string');
        }
        put('/v2/webhooks/' + webhook_id, data, cb);
      },
      remove: function(webhook_id, cb) {
        if (typeof webhook_id !== 'string') {
          throw new TypeError('webhook_id must be a string');
        }
        del('/v2/webhooks/' + webhook_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/webhooks', data, cb);
      }
    }
  };
};
