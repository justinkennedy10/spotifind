/**
 * Main database logic module
 * @module db/controller
 */

const mysql = require('mysql');
const db = require('./connection');

module.exports = {
  saveUser,
  savePlaylist,
  addUserToPlaylist,
  authorizeUserPlaylist
};

function saveUser(user) {
  return new Promise(function(resolve, reject) {
    db.query('INSERT INTO Users SET ?', user, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

function savePlaylist(playlist) {
  return new Promise(function(resolve, reject) {
    db.query('INSERT INTO Playlists SET ?', playlist, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

function addUserToPlaylist(uid, pid, role) {
  return new Promise(function(resolve, reject) {
    db.query('INSERT INTO UserPlaylists SET ?', { uid, pid, role }, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

function authorizeUserPlaylist(uid, spotify_pid) {
  return new Promise(function(resolve, reject) {
    db.query('INSERT INTO AuthorizedPlaylists SET ?', { uid, spotify_pid }, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}
