var jwt = require('jsonwebtoken');
var express = require('express');
var db = require('../database');
var bcrypt = require('bcrypt');
var make = require('./security');
var makehash = require('./hashfunc');
var LOGINSECRET = process.env.LOGINSECRET;
const url = require('url');
const querystring = require('querystring');
var IdTokenSECRET = process.env.IdTokenSECRET;
var randomtoken = require('./randomtoken');
var nodemailer = require('nodemailer');

var ttms = 1000 * 60 *60 * 5;
var tokentime = `${ttms}ms`;
module.exports  = (req,res, next) => {
var dataobj = req.body.JSONData;
if (dataobj){
  var userobj={
    "username":req.body.JSONData['USERNAME'],
    "password":req.body.JSONData['PASSWORD'],
    "code":req.body.JSONData['CODE']
  }
  // console.log(userobj);
newLogin(userobj)
}else{console.log("recieved nothing")}



function newLogin(userobj){

  var sqlline = "Select * From userbase where Username = ? or email = ?"
  db.execute(sqlline, [userobj.username,userobj.username])
    .then(([rows, fields]) => {
      if (rows.length >0){
        bcrypt.compare(userobj.password,rows[0].password,(err, resp) => {
          // console.log(resp)
          if (resp){
            if (rows[0].permissions === "admin"){

              adminlogin(rows[0].username,rows[0].userid,
                rows[0].permissions,rows[0].userdata)
            }
            else{
                userlogin(rows[0].username,rows[0].userid,
                  rows[0].permissions,rows[0].userdata)
            }

          }
        })
      }else{
        console.log("user does not exist")
        res.json({"UserExist":false,"message":"please fix your username or password"})
}

function adminlogin(username,userid,permissions,userdata){
  if (userobj["code"]){
    var sqlAuthcode = "SELECT * FROM TokenIds WHERE id = ?;"
         db.execute(sqlAuthcode, [userid]).then(([line, fields]) => {
          var line =  line[0].token
           jwt.verify(line, IdTokenSECRET, (err, result) => {
             console.log(result.code);
             if (userobj["code"] === result.code){
               userlogin(username,userid,
                 permissions,userdata)
             }else{
                //delete token out of db
             }
           })
         })
  }else{
    console.log("code was not provided sending new code")
    //make code
    var code = randomtoken()
    code = code.token
var email = rows[0].email
var emailmessage = "sent to admin"
var ttms2 = 1000 * 60 * 5;
var tokentime2 = `${ttms}ms`;
var date = new Date();

var adminobj={
"code":code,
"email":email,
"date":date
}
var  token = jwt.sign(adminobj, IdTokenSECRET, {
    expiresIn: tokentime2
  });

var sqlline2 = `DELETE FROM TokenIds WHERE id = ?;`
db.execute(sqlline2, [userid]).then(([rows, fields]) => {
  // console.log("rows")
  // console.log(rows)
  var sqlline3 = 'Insert Into TokenIds VALUES(?,?);'
  db.execute(sqlline3, [userid, token]).then(([rows, fields]) => {
    // console.log("rows")
    // console.log(rows)
  })
})
    emailsender(code,email,emailmessage)
    res.json({"enterCode":true})
  }
}
}).catch(err=>{
  console.log(err)
})
}

function userlogin(username,userid,permissions,userdata){
        var date = new Date();
        var tokenx = make(username, userid,permissions,userdata)
        res.json({"message":"password is correct","role":"user","DataToken":tokenx})
}

function emailsender(code, email, emailmessage){
// console.log("email"+email)
// console.log(email)
// console.log(code)

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
      }

    });
  //get token make it send to db send admin to login code screen


}


// newLogin()

console.log(userobj)


//if username exist and password correct contiue
//if role adminn next make token ID
//else res.send(DATATOKEN:dataToken,"role":'user')



}
