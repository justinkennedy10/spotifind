const db = require('./db/controller');
const { inviteToPlaylist } = require('./inviter');

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
      res.send(err);
    });
  });

}
