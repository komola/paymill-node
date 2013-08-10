/* Copyright 2011 Ask Bjørn Hansen, see LICENSE */
/* Copyright 2012 Sebastian Hoitz, Thomas Schaaf, see LICENSE */
'use strict';

var https = require('https');
var querystring = require('querystring');
// TODO: better error support
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
            // TODO: improve error codes
            response = JSON.parse(response);
            if(res.statusCode !== 200) {
              err = new Error('Response code is not ok');
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
    function(e){
      // TODO: do something useful
      console.error(e);
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
        if (!(payment_id && typeof payment_id === 'string')) {
          return cb('payment_id required');
        }
        get('/v2/payments/' + payment_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/payments', data, cb);
      },
      remove: function(payment_id, cb) {
        if (!(payment_id && typeof payment_id === 'string')) {
          return cb('payment_id required');
        }
        del('/v2/payments/' + payment_id, {}, cb);
      }
    },
    preauthorizations: {
      create: function(preauthorization, cb) {
        post('/v2/preauthorizations', preauthorization, cb);
      },
      details: function(preauthorization_id, cb) {
        if (!(preauthorization_id && typeof preauthorization_id === 'string')) {
          return cb('preauthorization_id required');
        }
        get('/v2/preauthorizations/' + preauthorization_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/preauthorizations', data, cb);
      }
    },
    transactions: {
      create: function(transaction, cb) {
        post('/v2/transactions', transaction, cb);
      },
      details: function(transaction_id, cb) {
        if (!(transaction_id && typeof transaction_id === 'string')) {
          return cb('transaction_id required');
        }
        get('/v2/transactions/' + transaction_id, {}, cb);
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
        if (!(refund_id && typeof refund_id === 'string')) {
          return cb('refund_id required');
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
        if (!(client_id && typeof client_id === 'string')) {
          return cb('client_id required');
        }
        get('/v2/clients/' + client_id, {}, cb);
      },
      update: function(client_id, data, cb) {
        if (!(client_id && typeof client_id === 'string')) {
          return cb('client_id required');
        }
        put('/v2/clients/' + client_id, data, cb);
      },
      remove: function(client_id, cb) {
        if (!(client_id && typeof client_id === 'string')) {
          return cb('client_id required');
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
        if (!(offer_id && typeof offer_id === 'string')) {
          return cb('offer_id required');
        }
        get('/v2/offers/' + offer_id, {}, cb);
      },
      update: function(offer_id, data, cb) {
        if (!(offer_id && typeof offer_id === 'string')) {
          return cb('offer_id required');
        }
        put('/v2/offers/' + offer_id, data, cb);
      },
      remove: function(offer_id, cb) {
        if (!(offer_id && typeof offer_id === 'string')) {
          return cb('offer_id required');
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
        if (!(subscription_id && typeof subscription_id === 'string')) {
          return cb('subscription_id required');
        }
        get('/v2/subscriptions/' + subscription_id, {}, cb);
      },
      update: function(subscription_id, data, cb) {
        if (!(subscription_id && typeof subscription_id === 'string')) {
          return cb('subscription_id required');
        }
        put('/v2/subscriptions/' + subscription_id, data, cb);
      },
      remove: function(subscription_id, cb) {
        if (!(subscription_id && typeof subscription_id === 'string')) {
          return cb('subscription_id required');
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
        if (!(webhook_id && typeof webhook_id === 'string')) {
          return cb('webhook_id required');
        }
        get('/v2/webhooks/' + webhook_id, {}, cb);
      },
      update: function(webhook_id, data, cb) {
        if (!(webhook_id && typeof webhook_id === 'string')) {
          return cb('webhook_id required');
        }
        put('/v2/webhooks/' + webhook_id, data, cb);
      },
      remove: function(webhook_id, cb) {
        if (!(webhook_id && typeof webhook_id === 'string')) {
          return cb('webhook_id required');
        }
        del('/v2/webhooks/' + webhook_id, {}, cb);
      },
      list: function(data, cb) {
        get('/v2/webhooks', data, cb);
      }
    }
  };
};
