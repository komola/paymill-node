/* Copyright 2011 Ask Bjørn Hansen, see LICENSE */
/* Copyright 2012 Sebastian Hoitz, Thomas Schaaf, see LICENSE */
"use strict";

var https = require('https');
var querystring = require('querystring');

function setup_response_handler(req, callback) {
  if (typeof callback !== "function") {
    //console.log("missing callback");
    return;
  }
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
            if(200 != res.statusCode) {
              err = new Error("Response code is not ok");
              err.response = response;
              response = null;
            }
          }
          catch(e) {
            err = new Error("Invalid JSON from paymill.com");
            response = null;
          }
          callback(err, response);
      });
    });
}

module.exports = function (api_key, options) {
  var defaults = options || {};

  var auth = 'Basic ' + new Buffer(api_key + ":").toString('base64');

  function _request(method, path, data, callback) {

    //console.log("data", typeof data, data);

    // convert first level of deep data structures to foo[bar]=baz syntax
    Object.keys(data).forEach(function(key) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        var o = data[key];
        delete data[key];
        Object.keys(o).forEach(function(k) {
          var new_key = key + "[" + k + "]";
          data[new_key] = o[k];
        });
      }
    });

    if (method === 'GET' && Object.keys(data).length > 0) {
      path += "?" + querystring.stringify(data);
      data = {}
    }

    var request_data = querystring.stringify(data);

    //console.log(method, "request for", path);
    //console.log("http request", request_data);

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
    setup_response_handler(req, callback);
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

  var api = {};

  //Add CRUD operations for each entitiy.
  [
    'payments',
    'preauthorizations',
    'transactions',
    'refunds',
    'clients',
    'offers',
    'subscriptions',
    'webhooks'
  ].forEach(function(entitiy_name) {
    var root_path = '/v2/' + entitiy_name;

    api[entitiy_name] = {
      create: function(data, cb) {
        post(root_path, data, cb);
      },
      details: function(entitiy_id, cb) {
        get(root_path + "/" + entitiy_id, {}, cb);
      },
      list: function(data, cb) {
        get(root_path, data, cb);
      },
      update: function(entitiy_id, data, cb) {
        put(root_path + "/" + entitiy_id, data, cb);
      },
      remove: function(entitiy_id, cb) {
        del(root_path + "/" + entitiy_id, {}, cb);
      }
    };
  });

  //Remove unsupported operations.
  delete api.payments.update;
  delete api.preauthorizations.update;
  delete api.transactions.remove;
  delete api.refunds.update;
  delete api.refunds.remove;

  return api;
};