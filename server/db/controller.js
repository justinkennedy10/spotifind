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
  authorizeUserPlaylist,
  getUserPlaylists,
  getPlaylistById,
  getUsersByPlaylistId,
  getAuthorizedUserPlaylists
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

function getUserPlaylists(uid) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT P.id, P.name, P.type, P.spotify_pid FROM Playlists P, UserPlaylists UP WHERE UP.uid = ?', uid, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

function getPlaylistById(pid) {
  return new Promise(function(resolve, reject) {
    db.query('SElECT * FROM Playlists WHERE id = ?', pid, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

function getUsersByPlaylistId(pid) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT U.id, U.access_token, U.refresh_token FROM Users U, UserPlaylists UP WHERE UP.pid = ?', pid, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}

function getAuthorizedUserPlaylists(uid) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT AP.spotify_pid FROM Users U, AuthorizedPlaylists AP WHERE AP.uid = ?', uid, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    });
  });
}
