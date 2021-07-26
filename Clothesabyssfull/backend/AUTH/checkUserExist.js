var IdTokenSECRET = process.env.IdTokenSECRET;
var ttms = 1000 * 60 * 5;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');
var db = require('../database');
var randomtoken = require('./randomtoken');
var nodemailer = require('nodemailer');

//maketoken

module.exports = (req, res, next) => {
  //start with backend enhancemnet before contiue of fontend
  var data = req.body.JSONData
   var email = data['EMAIL']
  var username = data['USERNAME']
  if (email) {
    username = email
  }
  // sql > user exist or not
if (!req.body.JSONData['CODE']){
  if (req.body.func="signup"){
    signupCheckAuth()
  }
  if (req.body.func="login"){
    login()
  }
}
else{
checkcode(req.body.tempTimeToken,req.body.JSONData['CODE'])

}


  function signupCheckAuth(){
    var sqlline = "Select * From userbase where username = ? or email = ?"
db.execute(sqlline, [username, username]).then(([rows, fields]) => {
//user exist return login
//if user doesnot userexist
//send email and return authtoken
if (rows[0]){
  res.json({"returnPage":"login"})
}else{
  var code = randomtoken()
  sendcodeEmail(code, username, emailmessage)
}

})

  }





    function login(){


  if (username || email && email !== undefined ) {
    console.log(email)
     data = req.body.JSONData
      email = data['EMAIL']
    var code = randomtoken()
    code=code.token


    var sqlline = "Select * From userbase where username = ? or email = ?"
    db.execute(sqlline, [email, email]).then(([rows, fields]) => {
      if (req.body.token) {
        var ismatched = checkcode(req.body.code)
        if (ismatched) {
          next()
        } else {
          res.json({
            "message": "failed code",
            "Error": "code failed"
          })
        }
      }
//if token
      else {

        if (rows[0] ) {
          if  (rows[0].permissions !== "user" ){
            if (!req.body.code) {
              var userid = rows[0].userid
              var tid = {
                "date": date,
                "login": username,
                "permissions": rows[0].permissions,
                "userid": userid,
                "code": code
              };

              var token = jwt.sign(tid, IdTokenSECRET, {
                expiresIn: tokentime
              });

              var sqlline2 = `DELETE FROM TokenIds WHERE id = ?;`
              db.execute(sqlline2, [userid]).then(([rows, fields]) => {
                console.log("rows")
                console.log(rows)
                var sqlline3 = 'Insert Into TokenIds VALUES(?,?);'
                db.execute(sqlline3, [userid, token]).then(([rows, fields]) => {
                  console.log("rows")
                  console.log(rows)
                })
              })

              var emailmessage = "confirm code to continue"
              sendcodeEmail(code, username, emailmessage)

              res.json({
                "EnterCode": true
              })
            } else {
              var sqllineTokenId = `SELECT FROM TokenIds WHERE userid = ?;`
              db.execute(sqllineTokenId, [userid]).then(([rows, fields]) => {
                var coderow = rows[0]
                var ismatched = checkcode(coderow)
                if (ismatched) {
                  next()
                } else {
                  res.json({
                    "message": "failed code",
                    "Error": "code failed"
                  })
                }
              })
            }
          }
          else{
              next()

          }

        }
//if rows[0]
         else {

          var date = new Date();
          var nulltid = {
            "date": date,
            "login": username,
            "permissions": "null",
            "code": code
          }
          console.log(nulltid)
          var token = jwt.sign(nulltid, IdTokenSECRET, {
            expiresIn: tokentime
          });
          var emailmessage = "confirm code to continue"
          sendcodeEmail(code, username, emailmessage)
          res.json({
            "returnAuthToken": token,
            "EnterCode": true
          })
        }
//no user found

      }
    });
  }



}

  function checkcode(token,code) {


    if (code) {
      console.log(code);

      jwt.verify(token, IdTokenSECRET, (err, result) => {
        console.log(result);
        if (result.code) {
          bcrypt.compare(req.body.code, result.code, (err, resp) => {
            console.log(resp)
            if (resp) {
              next()

            }
          })


        } else {
          console.log("failed checkcode 134")
        }


      })
    }
  }


  function sendcodeEmail(code, email, emailmessage) {
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
  //end


}
