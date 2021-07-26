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

  console.log(req.body);
  const data = req.body.productObjs;
  products = data
  var bool = "";
  var current_url = ""
  var total;

  function getP(productspec, pric, inv, index) {
    let sql = 'SELECT * FROM productInfo WHERE specId = ?'
    db.execute(sql, [productspec])
      .then(([rows, fields]) => {
        var bool;
        if (parseFloat(pric) === parseFloat(rows[0].productPrice) && parseInt(rows[0].productInventory) === parseInt(inv)) {
          bool = "true"
        } else {
          bool = "false"
        }

        if (data.length === index + 1) {
          console.log(bool)
          return bool;
        }

      }).then((bool) => {
        if (bool === "true") {
          console.log(bool)
          done(bool)
        }
      })
      .catch((err) => {
        console.log(err)
        console.log("catch error product is not in the database")
        done("false")
      });
  }


  if (data.length > 0) {
    data.forEach((product, index) => {
      var price = product.productPrice
      var inv = product.qty
      getP(product.productSpec, price, inv, index)
    });
  }

  function done(bool) {

    res.setHeader('Content-Type', 'application/json');
    if (bool === "true") {

      var route;

      request.post({
        url: "https://api.sandbox.paypal.com/v2/checkout/orders",
        headers: {
          'Authorization': `Bearer ${authtoken}`,
          'Accept': 'application/json'
        },
        body: obj1,
        json: true

      }, (error, response, body) => {
        console.log(body);
        body.links.forEach((link) => {

          if (link.rel === "approve") {

            var route = link.href
            var obj = {
              "infoObj": {
                "bool": `${bool}`,
                "route": `${route}`
              }
            }
            res.json(obj)
          }

        });

      });


    }

  }


}
