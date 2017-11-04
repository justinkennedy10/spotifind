const db = require('./db/controller');
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

  app.

  app.post('/api/invite', authenticate, function(req, res) {
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

  function validateInviteCode(code, uid) {
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
  }

}
