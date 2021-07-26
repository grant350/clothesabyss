var bcrypt = require('bcrypt');


const saltRounds = 10;
var LOGINSECRET = process.env.LOGINSECRET;
var ADMINAUTH = process.env.ADMINAUTH;
var SIGNUPAUTH = process.env.SIGNUPAUTH;
var ttms = 1000*60*60*3;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');

module.exports = (req, res,next) => {
  console.log("response")
  console.log("response")


  const authHeader = req.headers.authorization;
  console.log(authHeader)
 if (authHeader) {
   var token = authHeader.split(' ')[1];
 }

  var option;
  var role = req.body.role;
  if (req.body.role){
  if (role === 'admin'){
    console.log("emailverify admin");
    option = ADMINAUTH
  }
  else{
    console.log("emailverify normal");
    option = LOGINSECRET
  };

}

  console.log("token")
  console.log(token)
  var code = req.body.code
  console.log("code")
  console.log(code)

  jwt.verify(token,option, (err,result) => {
    console.log("result")
    console.log(result)
    if (result){
      bcrypt.compare(code, result.code, function(err, resultp) {
      console.log("resultp")
      console.log(resultp)
      if (resultp){

        if (result.func === 'signup'){
           req.body = result.data
        }
        if (result.func === 'login'){
          var adminhash =  jwt.sign({
                "role": req.body.role,
                "verified":true
              }, option, {
                expiresIn: tokentime
              });

          res.json({"adminhash":adminhash});
          return true
        }
      }
      else{
        console.log("failed")
      }
      })
    }
    else{
      console.log(err)
      console.log("jsonwebtoken failed in auth email")
    }
  })

}
