const { getAccessAndRefreshTokens } = require('./db/controller');
const User = require('./User');
const spotify = require('./spotify');

module.exports = {
  populateGenerationData(playlist) {
    return new Promise((resolve, reject) => { 
      Promise.all(playlist.users.map(populateUser))
        .then(users => {
          playlist.users = users;
          resolve(playlist);
        }).catch(error => reject(error));
    });
  }
}

function populateUser(user_id) {
  return new Promise((resolve, reject) => {
    getAccessAndRefreshTokens(user_id)
      .then(tokens => {
        user = new User(user_id, tokens.access_token, tokens.refresh_token);
        spotify.refreshToken(user.refresh_token)
          .then(access_token => {
	    user.access_token = access_token;
	    spotify.getRecentlyPlayed(user)
	      .then(recentTracks => spotify.getAudioFeatures(user, recentTracks))
	      .then(analyzed_tracks => {
	        user.recently_played = analyzed_tracks['audio_features'];
	        spotify.getTopTracks(user, 'short_term')
	          .then(topTracks => spotify.getAudioFeatures(user, topTracks))
	          .then(analyzed_top => {
    		    user.top_tracks = analyzed_top['audio_features'];
		    spotify.getTopArtists(user, 'short_term')
		      .then(top_artists => {
		        user.top_artists = top_artists;
		        resolve(user);
		      }).catch(err => reject(err));
	          }).catch(err => reject(err));
	      }).catch(err => reject(err));
          }).catch(err => reject(err));
      }).catch(err => reject(err));  
  })
}
