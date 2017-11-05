const spotify = require('./spotify');
const User = require('./User');

const sizes = {
  's': 25,
  'm': 50,
  'l': 100
}

module.exports = {
  generatePlaylist(playlist) {
    return new Promise((resolve, reject) => {
      var seeds = getSeeds(playlist.users);
      var targets = getTargets(playlist.type);

      getRecommendations(seeds, targets)
        .then(track_list => {
          track_list = orderByPopularity(track_list);
          track_list = selectTracksBySize(tracks, playlist.size)
          spotify.uploadPlaylist(user, playlist.name, tracks)
            .then(spotify_id => resolve(spotify_id))
            .catch((error, statusCode) => reject(statusCode));
          })
          .catch(err => reject(err));
    });
  }
}

function getSeeds(users) {
	
}

function getTargets(type) {

}

function getRecommendations(seeds, targets) {
  return new Promise(function(resolve, reject) {
			
  });
}

function orderByPopularity(track_list) {

}

function selectTracksBySize(track_list, size) {

}
