# Paymill-Node

This is a Node.JS wrapper for Paymills API.

## Installation

`npm install paymill-node`

## Usage overview

    var api_key = 'abc';  // secret stripe API key
    var stripe = require('stripe')(api_key);

    stripe.customers.create(
       { email: 'foobar@example.org' },
       function(err, customer) {
          if (err) {
             console.log("Couldn't create the customer record");
             return;
          }
          console.log("customer id", customer.id);
       }
     );

## TODO

See the [issue tracker](http://github.com/komola/paymill-node).

## Author

Sebastian Hoitz (hoitz@komola.de), Thomas Schaaf (schaaf@komola.de). Development was sponsored by [komola](http://www.komola.de/).

## Used by

- [Prismabox](http://prismabox.de/)

## License

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