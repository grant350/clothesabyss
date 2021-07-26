var CLIENT = process.env.CLIENTID;
var SECRET = process.env.SECRET;
var LOGINSECRET = process.env.LOGINSECRET;
var SESSIONSECRET = process.env.SESSIONSECRET;
var ttms = 1000*60*60*3;
var tokentime = `${ttms}ms`;
var PAYPAL_API = 'https://api.sandbox.paypal.com';
var jwt = require('jsonwebtoken');

//maketoken
module.exports = function maketoken(username,id,role,userdata) {
 var date = new Date();
 var obj = {
   "id": id,
   "date": date,
   "username":username,
   "role":role,
   "userdata":userdata
 }
 //obj.id +=1
 var token = jwt.sign(obj, LOGINSECRET, {
   expiresIn: tokentime
 });
 return token
}
