const db = require('./db/controller');
const Playlist = require('./Playlist');
const { populateGenerationData } = require('./populater');
const { generatePlaylist } = require('./generator');
const { inviteToPlaylist, getInviteCode } = require('./inviter');

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
      res.json(err);
    });
  });

  app.post('/api/invite', authenticate, function(req, res) {
    console.log(req.body);
    playlistId = req.body.playlistId;
    inviteeList = req.body.inviteeList;
    console.log(req.body.inviteeList);

    inviteToPlaylist(playlistId, inviteeList).then(function() {
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
      .catch(error => res.json(error));
  });

  // Generate the playlist
  app.post('/api/:id/playlists/:playlist_id/generate', authenticate, function(req, res) {
    // Ensure that the user owns this playlist
    db.checkUserHostsPlaylist(req.params.id, req.params.playlist_id)
      // Get the playlist
      .then(() => db.getPlaylistById(req.params.playlist_id))
      .then(result => {
        // Populate the playlist
        playlist = new Playlist(result);
        populateGenerationData(playlist);
      })
      // Generate the playlist
      .then((playlist) => generatePlaylist(playlist))
      // Save the spotify id
      .then(spotify_playlist_id => db.saveSpotifyPlaylistId(req.params.playlist_id, spotify_playlist_+id))
      // Send that shit back
      .then(spotify_playlist_id => res.send(spotify_playlist_id))
      .catch(error => res.json(error));
  });

  /*function validateInviteCode(code, uid) {
    return new Promise(function(resolve, reject) {
      getInviteCode(uid).then(function(res) {
        if (!res[0]) {
          // First code use!
        }
        else if (uid == res[0]) {
          // user matches and has already done this
        } else {
          reject('invalid_code');
        }

      }).catch(function (err) {
    }

    });


    // Query for the invite code
    // if not used
      // add uid to row
      // add user to user table
      // add user to playlist table
      // send them to selection
    // else
      // if uid matchs the one in table
        // send them to selection
      // else
        // invalid code
  }*/
}
