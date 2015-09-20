/* *****************
 * Require Imports *
 * *****************/

var express = require('express');
var path = require('path');

/* ***********************
 * Initialize Middleware *
 * **********************/

// Instantiate the express object
var app = express();

// Use the static assets from the same directory as this server.js file
app.use(express.static(path.resolve("./")));

/* **************
 * GET Requests *
 * **************/

// index.html
app.get('/', function(req, res) {
  res.sendFile('index.html');
});

/* ******************
 * Start the server *
 * ******************/

var port = process.env.PORT || 8000;

var server = app.listen(port, function() {
  console.log('Listening on port:', port);
});

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "ryww3bkjd3j5k797",
  publicKey: "st7z8nxm7sypddqc",
  privateKey: "1036ec5a6264c103b4d3a99f3ab989f6"
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.post("/checkout", function (req, res) {
  var nonce = req.body.payment_method_nonce;
  // Use payment method nonce here
});

gateway.transaction.sale({
  amount: '10.00',
  paymentMethodNonce: "fake-valid-visa-nonce",
}, function (err, result) {
});
