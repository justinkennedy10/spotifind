const db = require('./db/controller');
const Playlist = require('./Playlist');
const { populateGenerationData } = require('./populater');
const { generatePlaylist } = require('./generator');
const { inviteToPlaylist } = require('./inviter');
const { downloadPlaylist, refreshToken } = require('./spotify');
const User = require('./User');

module.exports = function(app, authenticate) {

  app.get('/api/me', authenticate, function(req, res) {
    res.json({id: req.user.id});
  })

  app.get('/api/playlist/:id', authenticate, function (req, res) {
    db.getPlaylistById(req.params.id).then(function (playlist) {
      res.json(playlist);
    }).catch(function (err) {
      res.json(err);
    })
  });

  app.get('/api/:id/playlists', authenticate, function (req, res) {
    db.getUserPlaylists(req.params.id).then(function (playlists) {
      res.json(playlists);
    }).catch(function (err) {
      res.status(500).json(err);
    });
  });

  app.get('/api/playlist/:id/collaborators', authenticate, function (req, res) {
    db.getCollaboratorsByPlaylist(req.params.id).then(function (phones) {
      res.json(phones);
    }).catch(function (err) {
      res.json(err);
    })
  })

  // This gets the tracks for a playlist
  app.get('/api/spotifyplaylist/:id', authenticate, function(req, res) {
    db.getAccessAndRefreshTokens(req.user.id)
      .then((tokens) => {
        user = new User(req.user.id, tokens.access_token, tokens.refresh_token);
        refreshToken(user.refresh_token)
          .then((access_token) => {
	           user.access_token = access_token;
             downloadPlaylist(user, req.params.id)
              .then((playlist) => {
                console.log(playlist);
                res.send(playlist);
              }).catch((err) => {
                console.log(err, "1");
                res.status(500).send(err);
              });
          }).catch((err) => {
            console.log(err, "2");
            res.status(500).send(err);
          });
        }).catch((err) => {
          console.log(err, "3");
          res.status(500).send(err);
        });
  });

  app.post('/api/invite', authenticate, function(req, res) {
    playlistId = req.body.playlistId;
    console.log(playlistId);
    inviteeList = req.body.inviteeList;
    uid = req.body.uid;
    console.log(req.body.inviteeList);

    inviteToPlaylist(uid, playlistId, inviteeList).then(function() {
      res.send("Success");
    }).catch(function(err) {
      res.json(err);
    });
  });

  //Create a playlist
  app.post('/api/:id/playlists/:playlist_id', authenticate, function(req, res) {
    // TODO Make sure the playlist doesn't already  exist
    db.savePlaylist({ id: req.params.playlist_id, name: req.body.name, type: req.body.type, size: req.body.size })
      .then(() => db.addUserToPlaylist(req.params.id, req.params.playlist_id, 'host'))
      .then(() => res.send('success'))
      .catch(error => res.status(500).json(error));
  });

  // Generate the playlist
  app.post('/api/:id/playlists/:playlist_id/generate', authenticate, function(req, res) {
    // Ensure that the user owns this playlist
    db.checkUserHostsPlaylist(req.params.id, req.params.playlist_id)
      // Get the playlist
      .then(() => db.getPlaylistObjectById(req.params.playlist_id, req.params.id))
      // Populate the data
      .then(playlist => populateGenerationData(playlist))
      // Generate the playlist
      .then(playlist => generatePlaylist(playlist))
      // Save the spotify id
      .then(spotify_playlist_id => db.saveSpotifyId(req.params.playlist_id, spotify_playlist_id))
      // Send that shit back
      .then(spotify_playlist_id => res.send(spotify_playlist_id))
      .catch(error => res.json(error));
  });

  app.post('/api/invite/validate', authenticate, function(req,res) {
    var invite_code = req.body.invite_code;
    console.log("Invite code" + invite_code);
    var user_id = req.user.id;
    validateInviteCode(invite_code, user_id).then((response) => {
      res.send({status: "success"});
    }).catch((err) => {
      console.log(err);
      if (err === 'invalid_code') {
        res.status(401).send({status: 'invalid_code'});
      } else if (err === 'already_used_by_you') {
        res.status(200).send({status: 'already_used_by_you'});
      } else {
        res.status(500).send({status: err});
      }
    });
  });

  function validateInviteCode(code, uid) {
    console.log("In validate invite code");
    return new Promise(function(resolve, reject) {
      db.getInviteCode(code).then((res) => {
          console.log(res);
          if (res.length === 0) {
            reject('invalid_code');
          } else if (!res[0].spotify_id) {
            //ADD UID TO ROW,
            db.addUserToInviteCode(code, uid, res[0].pid)
              .then(() => db.addUserToPlaylist(uid, res[0].pid, 'authorized_contributor'))
            //SEND THEM TO SELECTION
            .then(() => resolve());
          // ELSE
          } else {
            // IF UID MATCHES THE ONE IN TABLE
            if (uid == res[0].spotify_id) {
              // SEND THEM TO SELECTION
              reject('already_used_by_you');
            // ELSE INVALID CODE
            } else {
              console.log("Here");
              reject('invalid_code');
            }
          }
      }).catch(function (err) {
        console.log("Error");
        reject(err);
      });
    });
  }
}
