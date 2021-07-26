const mysql = require('mysql2');
const dotenv = require('dotenv');
const r = require('dotenv').config()
var mainhost="34.121.201.67"
mainhost="127.0.0.1"
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "grant",
  password: process.env.SQLPASSWORD,
  database: 'maindatabase',
  connectionLimit: 10,
  waitForConnections: true

})
 module.exports = pool.promise();
// pool.end();
