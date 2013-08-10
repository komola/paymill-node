var util = require('util');
var testrunner = require('qunit');

// change any option for all tests globally
testrunner.options.log = {
    // log assertions overview
    assertions : false,
    // log expected and actual values for failed tests
    errors : true,
    // log tests overview
    tests : true,
    // log summary
    summary : true,
    // log global summary (all files)
    globalSummary : false,
    // log currently testing code file
    testing : false
};

var callback = function (err, report) {
    util.log('Test done!');
    if (err) {
        util.log(util.inspect(err));
    } else {
        util.log(util.inspect(report));
    }
};

// one code and tests file
testrunner.run({
    code : '../lib/main.js',
    tests : ['payments_test.js', 'preauthorizations_test.js', 'transactions_test.js']
}, callback);