var express = require('express');
var db = require('../database');
var bcrypt = require('bcrypt');
var make = require('./security')
var hashfunc = require('./hashfunc')
var IdTokenSECRET = process.env.IdTokenSECRET;
var ttms = 1000 * 60 * 5;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');
var randomtoken = require('./randomtoken');

var nodemailer = require('nodemailer');

module.exports = function signupUser(req, res) {
  const saltRounds = 10;

  var data = req.body.JSONData
  var email = data['EMAIL']
  var username = data['USERNAME']
  if (email) {
    username = email
  }
  // sql > user exist or not
  // if (!req.body.JSONData['CODE']){


  function userExist() {
    let finduser = 'Select * FROM userbase Where email = ? or username = ?;'

    db.execute(finduser, [username, username]).then(([rows, fields]) => {
      if (rows[0]) {
        console.log("Userexist send to login")
        res.json({
          "returnPage": true
        })
      } else {
        var code = randomtoken()
        code = code.token

        var hf = hashfunc(code);

        console.log(hf)
        console.log("hf")
        console.log(hf)
        console.log("hf")
        console.log(hf)
        console.log(hf)
  var date = new Date();
  var nulltid = {
    "date": date,
    "login": username,
    "permissions": "null",
    "code": hf
  }


  console.log(nulltid)
  var token = jwt.sign(nulltid, IdTokenSECRET, {
    expiresIn: tokentime
  });
  var emailmes="sign up code"
  sendEmail(code,email,emailmes)
  res.json({"tempTimeToken": token})





      }
    })
  }


  if (!req.body.tempTimeToken || req.body.tempTimeToken === undefined){
    userExist()
  }else{
    console.log(req.body.tempTimeToken)
    MatchToken(req.body.tempTimeToken,req.body.JSONData['CODE'])
  }
  function sendEmail(code, email, emailmessage) {
console.log("email"+email)
console.log(email)
console.log(code)

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILERUSER,
        pass: process.env.GMAILAPPPASS
      }
    })
    var mailoptions = {
      from: "clothesabyss@gmail.com",
      to: email,
      subject: emailmessage,
      html: `<div style="background:linear-gradient(45deg, #3b1466, #fa3a3a); color:orange">${code}</div>`
    };
    transporter.sendMail(mailoptions, function(err, data) {
      if (err) {
        console.log("error sending")
        res.json({
          "message": emailmessage,
          "sent": false
        });

      } else {
        console.log("emailsent")
        res.json({
          "message": "email code sent, retrieving on other port...",
          "sent": true
        })
      }

    });


  };

  function MatchToken(tempTimeToken,code) {
    console.log(code)
    console.log(code)
    console.log(code)
    console.log("code")
    console.log(code)
    console.log(code)
    console.log(code)
    console.log(code)
    console.log(code)
    console.log(code)
    console.log(tempTimeToken)
    if (code && tempTimeToken) {

      console.log(code)
      console.log(tempTimeToken)

      console.log(code);

      jwt.verify(tempTimeToken, IdTokenSECRET, (err, result) => {
        console.log(result);
        if (result){
        if (result.code) {
          console.log(result.code)
          bcrypt.compare(code, result.code, (err, resp) => {
            console.log(resp)
            if (resp) {
              SendNewUser(data['PASSWORD'])
            }else{
              res.json({"codeFailed":true})
            }
          })
        } else {
          console.log("failed checkcode 134")
        }
      }else{
        userExist()
      }
      })
    }else{
      console.log("no token provieded")
      userExist()
    }
  }

  function SendNewUser(password) {
    var newp = hashfunc(password);

    var datafields = {
      "firstname": req.body.JSONData["FIRSTNAME"],
      "lastname": req.body.JSONData["LASTNAME"],
      "email": req.body.JSONData["EMAIL"],
      "userid": null,
      "username": req.body.JSONData["USERNAME"],
      "password": newp,
      "role": "user",
      "userdata": {
        "maininfo": {
          "age": 0,
          "backgroundSiteColor": "none"
        },
        "sidenav": {
          "height": 0,
          "waist": 0,
          "color": "none",
          "shoesize": 0
        }
      }
    };

    //makes accesstoken
    let insertintouser = 'INSERT INTO userbase(username,firstname,lastname,email,permissions,userid,password,userdata) VALUES(?,?,?,?,?,?,?,?);'
    let selectallusers = 'Select * FROM userbase ;'

    db.execute(selectallusers).then(([rows, fields]) => {
      console.log(rows)
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(datafields.password, salt, function(err, hash) {
          datafields.hashpass = hash
          datafields.userid = parseInt(rows.length) + 1
          db.execute(insertintouser, [

            datafields.username,
            datafields.firstname,
            datafields.lastname,
            datafields.email,
            datafields.role,
            datafields.userid,
            datafields.password,
            datafields.userdata

          ]).then((err, result) => {
            console.log("sign up 46")
            console.log(result)
            var token = make(datafields.username, datafields.userid,
              datafields.role,datafields.userdata)
              console.log(token)
            res.json({
              "message": "success inserted into db",
              "DataToken": token,
              "success": true
            })
          });

        })
      })

    }).catch((err) => {
      console.log(err)
      res.json({
        "failed": "useer must alrelady exist or other failure"
      })
    });

  }


}
