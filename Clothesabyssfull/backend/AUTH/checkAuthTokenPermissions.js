var CLIENT = process.env.CLIENTID;
var SECRET = process.env.SECRET;
var LOGINSECRET = process.env.LOGINSECRET;
var SESSIONSECRET = process.env.SESSIONSECRET;
var ttms = 1000*60*60*3;
var tokentime = `${ttms}ms`;
var PAYPAL_API = 'https://api.sandbox.paypal.com';
var jwt = require('jsonwebtoken');
var db = require('../database');

//maketoken
module.exports =  (req,res,next)=> {
  var token;
  try {
     token = req.headers.authorization.split(' ')[1]
    //console.log(token)
  }
  catch {
  console.log("no token here")
  token=undefined
  res.json({"token":"failed","returnPage":true})
  }



    const promiseA = new Promise( (resolutionFunc,rejectionFunc) => {

      jwt.verify(token, LOGINSECRET, (err, result) => {
        resolutionFunc(result);
      })
    }).then((tokenresult)=>{
        if (tokenresult){
          let finduser = 'Select * FROM userbase Where email = ? or username = ?;'
          var username = tokenresult.username
          db.execute(finduser, [username, username]).then(([rows, fields]) => {
            if (rows[0]) {
              req.permissions = rows[0].permissions
              // console.log(req.permissions)
              next()
            }else{
              res.json({"noUser":"true","failed":true})
            }
          }).catch((err)=>{console.log(err)})

        }else{
          res.json({"noUser":"true","failed":true})
        }
    })

    checkUser()
    //get permsions


function checkUser(){
//getdata token check it
//get permission check it


}





}
