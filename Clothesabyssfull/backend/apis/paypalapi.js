var request = require('request')
const paypal = require('@paypal/checkout-server-sdk');
var CLIENT = process.env.CLIENTID;
var SECRET = process.env.SECRET;
var LOGINSECRET = process.env.LOGINSECRET;
var ADMINAUTH = process.env.ADMINAUTH;
var SIGNUPAUTH = process.env.SIGNUPAUTH;
var SESSIONSECRET = process.env.SESSIONSECRET;
var PAYPAL_API = 'https://api.sandbox.paypal.com';

module.exports = (req, res, next) => {

  function access_tokens() {
    request.post({
      uri: "https://api.sandbox.paypal.com/v1/oauth2/token",
      headers: {
        "Accept": "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded"
      },
      auth: {
        'user': CLIENT,
        'pass': SECRET
      },
      json: true,
      form: {
        "grant_type": "client_credentials"
      }
    }, (error, response, body) => {
      console.log(body);
      authtoken = body.access_token
      console.log(authtoken)
    });
  }
  //access_token setinterval()
  var obj1 = {
    "intent": "CAPTURE",
    "application_context": {
      "return_url": "http://localhost:4200/success",
      "cancel_url": "http://localhost:4200"
    },
    "purchase_units": [{
      "amount": {
        "currency_code": "USD",
        "value": "220.00"
      }
    }]
  };
  console.log(req)
  let token = req.body.payerInfo.token;
  let payerid = req.body.payerInfo.payerId;


  request.post({
    url: `https://api.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authtoken}`,
      'Accept': 'application/json',
      'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a'
    },
    json: true

  }, (error, response, body) => {
    console.log(body);

  });

  var data;

  request.get({
    url: `https://api.sandbox.paypal.com/v2/checkout/orders/${token}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${authtoken}`,
      'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a'
    },
    json: true

  }, (error, response, body) => {
    console.log(body);
    data = body


    function removeqty(spec, inv, currentqty) {
      let total = (inv - currentqty)
      let sql = 'UPDATE  productInfo SET productinventory = ? WHERE specId = ?;'
      db.execute(sql, [total, spec])
        .then(([rows, fields]) => {
          console.log(rows)


        }).catch((err) => {
          console.log(err)
          console.log("cant delete product in database line 174 app.js")
        });
    }
    if (products.length > 0) {
      products.forEach((product) => {
        var inv = product.qty
        var currentqty = product.selectedQty
        removeqty(product.productSpec, inv, currentqty)
      });
    }
    res.json(data)
  });
}
