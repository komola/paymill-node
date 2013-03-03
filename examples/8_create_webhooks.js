var api_key = 'ab14f323454aabe145687c6951575d81';  // secret paymill API key
var paymill = require('paymill-node')(api_key);

paymill.webhooks.create(
    {
        url: 'http://requestb.in/1dgn50m1',
    	event_types: ['transaction.created', 'subscription.created']
	},
    function(err, webhook) {
        if (err) {
            console.log("Couldn't create the transaction record");
            return;
        }
        console.log(webhook.data);
    }
);