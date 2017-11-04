const uuidv4 = require('uuid/v4');
const { addInviteCode } = require('./db/controller');

module.exports = {
  inviteToPlaylist
}

function inviteToPlaylist(playlistId, phoneNumbers) {
  console.log(phoneNumbers);
  return Promise.all(
      phoneNumbers.map(function(phoneNumber) {
        inviteToPlaylistSingle(playlistId, phoneNumber);
      })
    ).then(function(res) {
      resolve();
    }).catch(error => {
      reject(error);
    });
}

function inviteToPlaylistSingle(playlistId, phoneNumber) {
  return new Promise(function(resolve, reject) {
    let inviteCode = uuidv4();
    addInviteCode(playlistId, inviteCode).then(function (res) {
      sendInvite(phoneNumber, inviteCode).then(() => {
        resolve();
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  });
}

function sendInvite(phoneNumber, inviteCode) {
  return new Promise(function(resolve, reject) {
    console.log("Sending invite to", phoneNumber, ": ", inviteCode);
    resolve();
  });
}

