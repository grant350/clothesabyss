//SetUp General
var express = require('express');
const r = require('dotenv').config()
var bp = require('body-parser')
const passport = require('passport');
var bcrypt = require('bcrypt');
var router = express.Router();
var port = 4201;
var app = express();
var cors = require("cors");
var session = require('express-session')
//FilesUpload
// var upload = require('./uploaders/upload');
//Data posting
var deleteData = require('./database/deleteData')
var sqlpost = require('./database/sqlpost');
var datapush = require('./database/datapush')
var getData=require('./database/getData')


//unittest
// var unittest = require('./uploaders/unittest.test')
//Login
var checkAuthTokenPermissions = require('./AUTH/checkAuthTokenPermissions')
var login = require('./AUTH/login');
var logout = require('./AUTH/logout');
var signup = require('./AUTH/signup');

var verify = require('./AUTH/verifyDataToken')
//var loginapimain = loginapi.verify;

//Auththentication EmailCode
//var emailcodemaker = require("./emailcodemaker");

//paypal transaction proccess
var paypalapiOutbound = require('./apis/paypalapiOutbound')
var paypalapi = require('./apis/paypalapi')
//JWT
var ttms = 1000 * 60 * 60 * 3
var tokentime = `${ttms}ms`
var jwt = require('jsonwebtoken');
//Garbbage below?
//App Set UP





app.use(bp.json({
  extended: true,
  limit: '500mb'
}))

app.use(bp.urlencoded({
  extended: true
}))

app.use(cors({credentials: true, origin: true}))




var urlencodedParser = bp.urlencoded({
  extended: true
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', "x-access-token,Origin, Cookie, Content-Type, Accept, X-Requested-With,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  // res.setHeader('enctype', 'multipart/form-data')
  next()
})



app.post('/databasePush',checkAuthTokenPermissions,datapush,(req, res, next) => {})

app.get('/getData',checkAuthTokenPermissions,getData,(req, res, next) => {})


app.get('/deleteData',checkAuthTokenPermissions,deleteData, (req, res, next) => {})

app.post('/mapui',checkAuthTokenPermissions,datapush,(req, res, next) => {})
app.post('/graphui',checkAuthTokenPermissions,datapush,(req, res, next) => {})





app.post('/signup',signup,(req, res, next) => {})
app.post('/login',login, (req, res, next) => {});
app.post('/verifyDataToken', verify, (req, res, next) => {
  // console.log(req.headers)
  // console.log(req.headers.Authorization)
});
app.get('/verifyDataToken', (req, res, next) => {
  // console.log(req.headers);
  res.send(req.headers.Authorization)
})
app.post('/logout', logout, (req, res, next) => {});
app.post('/paypalDone', paypalapi, urlencodedParser, function(req, res) {})
app.post('/api', paypalapiOutbound , urlencodedParser, function(req, res) {});









app.listen(port, function() {
  console.log("hello... hello... hello... is there anybody in there?  Just nod if you can hear me. Is there anyone home.\n ");
  console.log("THE DICK SIDE OF THE MOON... started on port 4200")

})

module.exports = app;



//http://localhost:4201/api
