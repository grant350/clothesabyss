var CLIENT = process.env.CLIENTID;
var SECRET = process.env.SECRET;
var LOGINSECRET = process.env.LOGINSECRET;
var ADMINAUTH = process.env.ADMINAUTH;
var nodemailer = require('nodemailer');
var randomtoken = require('../randomtoken');
var ttms = 1000 * 60 * 5;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');
var SIGNUPAUTH = process.env.SIGNUPAUTH;
var bcrypt = require('bcrypt');
var express = require('express');
var db = require('../database');

module.exports = (req,res,next)=> {
  let checkuserexist = 'SELECT * FROM userbase WHERE email = ? OR username = ?;'
  var oldtoken = req.body.emailtoken
  var url = "emailverify";
  var role = req.role;
  var email = req.body.email;
  var data = req.body.data
var func = req.body.func
  db.execute(checkuserexist, [email, email])
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        console.log(rows)
        email = rows[0].email
        role = rows[0].permissions
      }

  var option;
  if (role === 'admin'){
    option = ADMINAUTH
  }
  else{
    option = LOGINSECRET
  }

if (oldtoken){
    jwt.verify(oldtoken, option, (err, result) => {
      if (result) {
        console.log("codealready sent")
        res.json({
          "sent": true,
          "route":`${token}`
        });
        return false

      } else {
      runfunc()
      }
    })
  }
else{
  console.log("runfunc")
  runfunc()

}
 function runfunc(){
  let random = randomtoken()
  let num = random.token
  var date = new Date();
  //obj.id +=1
console.log("runfunc")
  var saltRounds = 10
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(num, salt, function(err, hash) {

      var token = jwt.sign({
        "code": hash,
        "date": date,
        "func":func,
        "data":data
      }, option, {
        expiresIn: tokentime
      });


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
        subject: "confirm email to finish account creation",
        html: `<div style='background:red'>${num}</div>`
      }



      transporter.sendMail(mailoptions, function(err, data) {
        if (err) {
          console.log("error sending")
          res.json({
            "message": "email code not sent failed or code already sent",
            "sent": false,
            "route":`${token}`
          });
          return false

        } else {
          console.log(token)
          console.log("emailsent")
          res.json(   {
              "message": "email code sent, retrieving on other port...",
              "sent": true,
              "route":`${token}`
            })
            return true



        }

      });
    })
  })


}


}).catch((error) => {
  console.log(error)
});
next()

}
