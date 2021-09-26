var jwt = require('jsonwebtoken');
var express = require('express');
var db = require('../database');
var bcrypt = require('bcrypt');
var make = require('./security');
var makehash = require('./hashfunc');
var LOGINSECRET = process.env.LOGINSECRET;
const url = require('url');
const querystring = require('querystring');
// var ADMINAUTH = process.env.ADMINAUTH;
// let sql2 = `UPDATE userbase
//     SET loggedin = ?
//    WHERE username = ?`;
// var out=0
module.exports  = (req,res, next) => {

var token;
try {
   token = req.headers.authorization.split(' ')[1]
  // console.log(token)
}
catch {
console.log("no token here")
}
console.log(token,"token")
  jwt.verify(token,LOGINSECRET, (err,result) => {
    if (result){
      console.log("result: 22 verifydata");
        console.log("result")
        console.log(result)
      res.json({"verified":"true","userdata":result.userdata,"role":result.role})
    }
    else{
      console.log("token expired:failed");
      res.json({"message":"tokenexpired","line":29,"token":false})
    }

  })








}
