var randomtoken = require('../AUTH/randomtoken');
var userobj = {}
var db = require('../database');
var ttms = 1000 * 60 * 60 * 3;
var tokentime = `${ttms}ms`;
var jwt = require('jsonwebtoken');
const saltRounds = 10;
var LOGINSECRET = process.env.LOGINSECRET;



module.exports = (req, res, next) => {


//make functions to post all data

var checkPermisionsMap={
  "AdminOwner":1,
  "Admin":2,
  "partialAccess":3,
  "readOnly":4,
  "user":null
}
//postSqlData({},{},null)
//start sql db after
function postSqlData(data,accesstoken,emailAuth){









}







  var userdata = req.body.data
  console.log("sqlpost")
  console.log(userdata)
  var option = req.body.option
  var newhash = jwt.sign(userdata, LOGINSECRET, {
    expiresIn: tokentime
  });


  function userdataObj() {
      var pass = null
      var userid = userdata.userid
      let select = `select * from userbase  WHERE userid = ?;`
      let resetss = `UPDATE userbase SET resets = ?, firstname = ?, lastname = ?, email = ?, username = ? , userdata = ?  WHERE userid = ?;`
      let resetpass = `UPDATE userbase SET resets = ?, password = ?  WHERE userid = ?;`

    db.execute(select, [userid]).then(([rows, fields]) => {
      console.log(rows[0].resets)
      var data = rows[0].resets
      var username2 = userdata.username
      var firstname2 = userdata.firstname
      var lastname2 = userdata.lastname
      var email2 = userdata.email
      //data=JSON.parse(data)
      if (req.body.affected) {
        var affected = req.body.affected
        var i = affected[0]
        var x = affected[1]
        data = JSON.parse(data)
        console.log(data[`${i}`])
        console.log(data[`${x}`])
        if (data[i] > 0) {
          data[i] -= 1
          pass = true
        } else {
          pass = false
        }
        if (data[x] > 0) {
          data[x] -= 1
          pass = true
        }
        console.log(pass)
        if (pass) {
          if (i === "firstname" || i === "lastname" || i === "username" || i === "email") {
            db.execute(resetss, [data, firstname2, lastname2, email2, username, userdata, userid]).then(([rows, fields]) => {
              console.log(rows[0])
              userdata.password = null
              delete userdata.password
              var postdata = JSON.stringify(userdata)
              res.json({
                "newhash": newhash
              })
              return true
            }).catch((err) => {
              console.log(err)
            })
          }
          if (i === "password") {
            bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(userdata.password, salt, function(err, hash) {
            db.execute(resetpass, [data, hash, userid]).then(([rows, fields]) => {
              console.log(rows[0])
              res.json({
                "success": true
              })
              return true

            }).catch((err) => {
              console.log(err)
            })


          })
        })
          }

        }
      }
      ///iffirst name >=1 change obj allow cahnge for big obj
    }).catch((err) => {
      console.log(err)
    })
    // end of userdata obj
  }
  next()
}
