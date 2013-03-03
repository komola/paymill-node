var api_key = 'ab14f323454aabe145687c6951575d81';  // secret paymill API key
var paymill = require('paymill-node')(api_key);

paymill.payments.list({},
    function(err, payments) {
        if (err) {
            console.log("Error :(");
            return;
        }
        console.log("payment id " + payments.data[0].id);
    }
);