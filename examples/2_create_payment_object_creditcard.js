var api_key = 'ab14f323454aabe145687c6951575d81';  // secret paymill API key
var paymill = require('paymill-node')(api_key);

paymill.payments.create(
    {
    	/*client: 'client_88a388d9dd48f86c3136',*/
    	token: '098f6bcd4621d373cade4e832627b4f6'
	},
    function(err, payment) {
        if (err) {
            console.log("Couldn't create the payment record");
            return;
        }
        console.log("payment id " + payment.data.id);
    }
);