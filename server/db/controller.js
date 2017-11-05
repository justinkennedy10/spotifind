/**
 * Main database logic module
 * @module db/controller
 */

const mysql = require('mysql');
const db = require('./connection');
const Playlist = require('../Playlist');

module.exports = {
  saveUser,
  savePlaylist,
  addUserToPlaylist,
  authorizeUserPlaylist,
  getUserPlaylists,
  getPlaylistById,
  getPlaylistObjectById,
  getUsersByPlaylistId,
  getAuthorizedUserPlaylists,
  addInviteCode,
  getPlaylistForInviteCode,
  getInviteCode,
  checkUserHostsPlaylist,
  saveSpotifyId,
  getAccessAndRefreshTokens,
  getCollaboratorsByPlaylist
};

function saveUser(user) {
  return new Promise(function(resolve, reject) {
    db.query('INSERT IGNORE INTO Users SET ?', user, function (err, res) {
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
    db.query('SELECT P.id, P.name, P.type, P.spotify_pid FROM Playlists P, UserPlaylists UP WHERE P.id = UP.pid AND UP.uid = ?', uid, function (err, res) {
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

function getPlaylistObjectById(pid) {
  return new Promise(function(resolve, reject) {
    playlist = null;
    db.query('SElECT * FROM Playlists WHERE id = ?', pid, function (err, res) {
      if(err) {
        reject(err);
      } else {
        playlist = new Playlist(res[0].id, res[0].type, res[0].name, res[0].size, []);
        db.query('SELECT uid FROM UserPlaylists WHERE pid = ?', pid, function(err, res) {
          if (err) {
            reject(err);
          } else {
            res.forEach(row => {
              playlist.users.push(row.uid);
            });
            resolve(playlist);
          }
        });
      }
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

function addInviteCode(pid, inviteCode, phone) {
  return new Promise(function(resolve, reject) {
    db.query('INSERT INTO InviteCodes SET ?', {
      pid,
      invite_code: inviteCode,
      phone
    }, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    })
  })
}

function getInviteCode(inviteCode) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT spotify_id, pid, FROM InviteCodes WHERE invite_code = ?', inviteCode, function(err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function getCollaboratorsByPlaylist(pid) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT phone FROM InviteCodes WHERE pid = ?', pid, function (err, res) {
      if(err) reject(err);
      else resolve(res);
    })
  });
}

function getPlaylistForInviteCode(uniqueCode) {

}

function checkUserHostsPlaylist(uid, pid) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT role FROM UserPlaylists WHERE uid = ? AND pid = ?', [uid, pid], function(err, res) {
      if (err) {
        reject(err);
      } else {
        if (res[0] == 'host') {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}

function saveSpotifyId(our_id, spotify_id) {
  return new Promise(function(resolve, reject) {
    db.query('UPDATE Playlists SET spotify_pid = ? WHERE id = ?', [our_id, spotify_id], function(err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(spotify_id)
      }
    });
  });
}

function getAccessAndRefreshTokens(uid) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT access_token, refresh_token FROM Users WHERE uid = ?', uid, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res[0]);
      }
    });
  });
}
