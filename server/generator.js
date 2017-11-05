const spotify = require('./spotify');
const User = require('./User');

module.exports = {
  generatePlaylist(playlist) {
    return new Promise((resolve, reject) => {
      user = new User(playlist.users[0].uid, playlist.users[0].access_token, playlist.users[0].refresh_token);
      var track_list = [];
      playlist.users.forEach(user => {
        user.recently_played.forEach(song => {
          track_list.push(song.id);
        });
      });
      var tracks = track_list.slice(0, 50);
      spotify.uploadPlaylist(user, playlist.name, tracks)
        .then(spotify_id => resolve(spotify_id))
        .catch((error, statusCode) => reject(statusCode));
    });
  }
}
