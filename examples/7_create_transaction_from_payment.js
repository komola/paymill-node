var api_key = 'ab14f323454aabe145687c6951575d81';  // secret paymill API key
var paymill = require('paymill-node')(api_key);

paymill.transactions.create(
    {
        /*client: 'client_88a388d9dd48f86c3136',*/
    	payment: 'pay_a818b847db6ce5ff636f',
        amount: '4200',
        currency: 'EUR',
        description: 'Test Transaction'
	},
    function(err, transaction) {
        if (err) {
            console.log("Couldn't create the transaction record");
            return;
        }
        console.log("transaction id " + transaction.data.id);
    }
);