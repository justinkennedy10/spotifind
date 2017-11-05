const uuidv4 = require('uuid/v4');
const twilio = require('twilio');
const { addInviteCode } = require('./db/controller');
const config = require('./config.json');

module.exports = {
  inviteToPlaylist
}

function inviteToPlaylist(uid, playlistId, phoneNumbers) {
  console.log(phoneNumbers);
  return Promise.all(
      phoneNumbers.map(function(phoneNumber) {
        inviteToPlaylistSingle(uid, playlistId, phoneNumber);
      })
    ).then(function(res) {
      resolve();
    }).catch(error => {
      reject(error);
    });
}

function inviteToPlaylistSingle(uid, playlistId, phoneNumber) {
  return new Promise(function(resolve, reject) {
    let inviteCode = uuidv4();
    addInviteCode(playlistId, inviteCode).then(function (res) {
      sendInvite(uid, phoneNumber, inviteCode).then(() => {
        resolve();
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  });
}

function sendInvite(uid, phoneNumber, inviteCode) {
  var accountSid = config.twilioSid;
  var authToken = config.twilioAuthToken;
  var client = new twilio(accountSid, authToken);
  var url = "http://localhost:3000/invite/" + inviteCode;

  return new Promise(function(resolve, reject) {
      console.log("Sending invite to", phoneNumber, ": ", inviteCode);
      client.messages.create({
      body: `Spotify user ${uid} has invited you to create a plalist based on your combined musical tasts via Spotify.  Follow this link to join the fun!  ${url}`,
      to: phoneNumber,  // Text this number
      from: '+17816229676 ' // From a valid Twilio number
    }).then(() => resolve()
  ).catch((err) => reject(err));
  });
}
