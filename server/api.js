const db = require('./db/controller');
const { inviteToPlaylist } = require('./inviter');
const Playlist = require('./Playlist');
const { populateGenerationData } = require('./populater');
const { generatePlaylist } = require('./generator');

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
    // TODO: add invitees to playlist table
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
    db.savePlaylist({ name: req.body.name, type: req.body.type, size: req.body.size })
      .then(() => db.addUserToPlaylist(req.params.id, req.params.playlist_id, 'HOST'))
      .then(() => res.send('success'))
      .catch(error => res.json(error));
  });

  //Update a playlist
  app.put('/api/:id/playlists/:playlist_id', authenticate, function(req, res) {
    db.checkUserHostsPlaylist(req.param.id, req.param.playlist_id)
      .then(() => db.savePlaylist({ name: req.body.name, type: req.body.type, size: req.body.size }))
      .then(() => res.send('success'))
      .catch(error => res.json(error));
  });

  //Add a collaborator
  app.post('/api/:id/playlists/:playlist_id/contributor', authenticate, function(req, res) {
    res.send('Not functional Yet');
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
}
