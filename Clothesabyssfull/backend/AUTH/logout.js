var express = require('express');
var db = require('../database');
var bcrypt = require('bcrypt');

var make = require('./security');

var makehash = require('./hashfunc');
var LOGINSECRET = process.env.LOGINSECRET;
var ADMINAUTH = process.env.ADMINAUTH;
var jwt = require('jsonwebtoken');
let sql2 = `UPDATE userbase
    SET loggedin = ?
   WHERE username = ?`;
var out=0
module.exports = (req, res, next) => {
var option;
var username = req.body.username
var hashAuth = req.body.hash

  jwt.verify(hashAuth,ADMINAUTH, (err,result) => {
    if (result){option = ADMINAUTH}
    else{console.log("err in admin verify movingon to loginnormal")}
    if (err){
      console.log("continue")
        option = LOGINSECRET
    }
  })
    jwt.verify(hashAuth,option, (err,result) => {
      if (result){

        console.log("logout")
          db.execute(sql2, [out, username]).then(([rows, fields]) => {
            console.log(rows);
            console.log("adding logged in 0 to user")
            res.json({
              "message": "sent to database"
            })
          }).catch((err) => {
            console.log(err);
          })


      }
    })

next()


}
