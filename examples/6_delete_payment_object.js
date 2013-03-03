var api_key = 'ab14f323454aabe145687c6951575d81';  // secret paymill API key
var paymill = require('paymill-node')(api_key);

paymill.payments.remove('pay_917018675b21ca03c4fb',
    function(err, payment) {
        if (err) {
            console.log("Error :(");
            return;
        }
        console.log("deleted the payment");
    }
);