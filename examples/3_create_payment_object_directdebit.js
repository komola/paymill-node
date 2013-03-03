var api_key = 'ab14f323454aabe145687c6951575d81';  // secret paymill API key
var paymill = require('paymill-node')(api_key);

paymill.payments.create(
    {
        /*client: 'client_88a388d9dd48f86c3136',*/
    	type: 'debit',
        code: '25050000',
        account: '123456789',
        holder: 'Max Mustermann'
	},
    function(err, payment) {
        if (err) {
            console.log("Couldn't create the payment record");
            return;
        }
        console.log("payment id " + payment.data.id);
    }
);