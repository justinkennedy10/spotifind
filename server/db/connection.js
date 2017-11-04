/**
 * MySQL connection module
 * @module database/connection
 */

const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
  host: 'spotifind.c3nq0qaxbke5.us-west-2.rds.amazonaws.com',
  port: 3306,
  user: 'mgabjk',
  password: config.sqlMasterPass,
  database: 'spotifind'
});

connection.connect(function(err) {
  if (err) {
    console.error(`Error connecting: ${err.stack}`);
    process.exit(1);
  }
  console.log(`Connected as thread ${connection.threadId}`);
});

module.exports = connection;
