# Paymill-Node [![Build Status](https://travis-ci.org/komola/paymill-node.png?branch=master)](https://travis-ci.org/komola/paymill-node) ![Dependencies](https://david-dm.org/komola/paymill-node.png) ![Dev dependencies](https://david-dm.org/komola/paymill-node/dev-status.png)

[![NPM](https://nodei.co/npm/paymill-node.png?downloads=true)](https://nodei.co/npm/paymill-node/)

This is a Node.JS wrapper for [Paymills](http://paymill.com/) [API/v2](https://www.paymill.com/en-gb/documentation-3/reference/api-reference/index.html).

## Installation

`npm install paymill-node`

## Usage overview

```javascript
var api_key = 'abc';  // secret paymill API key
var paymill = require('paymill-node')(api_key);

paymill.clients.create(
    {email: 'schaaf@komola.de'},
    function(err, client) {
        if (err) {
            console.log("Couldn't create the customer record");
            return;
        }
        console.log("client id " + client.data.id);
    }
);
```

## API

All methods takes a callback as their last parameter. The callback is
called with an error code (if any) and then the response.

* `paymill.payments` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-payments)
    * `.create(payment)`
    * `.details(payment_id)`
    * `.list(data)`
    * `.remove(payment_id)`
* `paymill.preauthorizations` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-preauthorizations)
    * `.create(preauthorization)`
    * `.details(preauthorization_id)`
    * `.list(data)`
* `paymill.transactions` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-transactions)
    * `.create(transaction)`
    * `.details(transaction_id)`
    * `.update(transaction_id, data)`
    * `.list(data)`
* `paymill.refunds` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-refunds)
    * `.refund(tranaction_id, amount, description)`
    * `.details(refund_id)`
    * `.list(data)`
* `paymill.clients` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-clients)
    * `.create(client)`
    * `.details(client_id)`
    * `.update(client_id, data)`
    * `.remove(client_id)`
    * `.list(data)`
* `paymill.offers` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-offers)
    * `.create(offer)`
    * `.details(offer_id)`
    * `.update(offer_id, data)`
    * `.remove(offer_id)`
    * `.list(data)`
* `paymill.subscriptions` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-subscriptions)
    * `.create(subscription)`
    * `.details(subscription_id)`
    * `.update(subscription_id, data)`
    * `.remove(subscription_id)`
    * `.list(data)`
* `paymill.webhooks` - (https://www.paymill.com/en-gb/documentation-3/reference/api-reference/#document-webhooks)
    * `.create(webhook)`
    * `.details(webhook_id)`
    * `.update(webhook_id, data)`
    * `.remove(webhook_id)`
    * `.list(data)`

## Examples

I created an account paymill-node@mailinator.com for testing purposes. The password ist paymill-node. The API keys in this document are from it. I also created a postbin for testing purposes at: http://requestb.in/1dgn50m1?inspect

## TODO

See the [issue tracker](http://github.com/komola/paymill-node/issues).

## Author

Authors, sorted by number of commits:
```
$ git shortlog -s | sort -rn
    18	Thomas Schaaf
    15	Nikolas Poniros
    11	Sebastian Hoitz
     2	Jörg Tillmann
     1	Quentin Adam
     1	Emilian Stoilkov
```

Sebastian Hoitz (hoitz@komola.de), Thomas Schaaf (schaaf@komola.de).
Development was sponsored by [komola](http://www.komola.de/).

## Used by

- [Prismabox](http://prismabox.de/)

## License

(The MIT License)

Copyright (C) 2011 Ask Bjørn Hansen
Copyright (C) 2012 Sebastian Hoitz, Thomas Schaaf

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Thanks
Big thanks go to Ask Bjørn Hansens (ask@develooper.com) who created [node-stripe](https://github.com/abh/node-stripe) and greatly inspired the structure.
We also thank [Paymill](http://paymill.com) for making payment awesome for europeans.
