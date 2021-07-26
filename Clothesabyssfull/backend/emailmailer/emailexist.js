var db = require('../database');
var express = require('express');

module.exports = (req, res, next) => {
  let checkuserexist = 'SELECT * FROM userbase WHERE email = ? OR username = ?;'
  var email = req.body.email
  console.log(email)
  console.log(req.url)

  db.execute(checkuserexist, [email, email])
    .then(([rows, fields]) => {
      console.log(rows)
      if (rows.length > 0) {
        console.log(rows)
        res.json({ "result":true})
        return true

      }else{
        res.json({ "result":false})
        return false

      }


    }).catch((error) => {
      console.log(error)
    });
next()

}
