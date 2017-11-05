const request = require('request');
const config = require('./config.json');

const client_id = config['spotifyClientId'];
const client_secret = config['spotifySecret'];

const DESCRIPTIONS = [
  'Brought to you by Spotifind'
]

/*
  ALL function are promises, all return (error, status_code) on error

  refreshToken(refresh_token: String) => access_token: String
  uploadPlaylist(user: User, name: String, tracks: Array[<track_id: String>]) => playlist_id: String
  getUsersPlaylists(user: User) => playlist_array: Array[<playlist_id: String>]
  downloadPlaylist(user: User, playlist: String) => tracks: Array[{<id: String>,<popularity: Int>}]
  getAudioFeatures(user: User, tracks: Array[<track_id: String>]) => tracks: Array[{<custom audio feature object>}]
  getRecentlyPlayed(user: User) => tracks: Array[<track_id: String>]
  getTopTracks(user: User, term: String?short_term,medium_term,long_term?) => tracks: Array[<track_id: String>]
  getTopArtists(user: User, term: String?short_term,medium_term,long_term?) => tracks: Array[<artist_id: String>]
  getRecommendations(
    user: User,
    seed_artists: Array[<artist_id: String>],
    seed_genres: Array[<genre_id: String>],        seed_artists + seed_genres + seed_tracks <= 5
    seed_tracks: Array[<track_id: String>],
    targets: Array[{<attribute: String>,<value: Float>}]) => tracks: Array[<artist_id: String>]
*/

function refreshToken(refresh_token) {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        resolve(body.access_token);
      } else {
        reject(error, response.statusCode)
      }
    });
  });
}

function uploadPlaylist(user, name, tracks) {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://api.spotify.com/v1/users/' + user.uid + '/playlists',
      headers: { 'Authorization': 'Bearer ' + user.access_token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)] }),
      dataType: 'json'
    }

    request.post(options, function(error, response, body) {
      if(!error && (response.statusCode === 200 || response.statusCode === 201)) {
        var playlist_id = JSON.parse(body)['id'];
        var uris = []
        tracks.forEach(track => {
          uris.push('spotify:track:' + track);
        });

        var options = {
          url: 'https://api.spotify.com/v1/users/' + user.uid + '/playlists/' + playlist_id + '/tracks',
          headers: { 'Authorization': 'Bearer ' + user.access_token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ uris: uris }),
          dataType: 'json'
        }

        request.post(options, function(error, response, body) {
          if(!error && response.statusCode === 201) {
            resolve(playlist_id);
          } else {
            reject(error, response.statusCode);
          }
        });

      } else {
        reject(error, response.statusCode);
      }
    });
  });
}

function getUsersPlaylists(user) {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: { 'Authorization': 'Bearer ' + user.access_token },
    }

    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        playlists = [];
        JSON.parse(body)['items'].forEach(item => {
        playlists.push(item.id);
        });
        resolve(playlists);
      } else {
        reject(error, response.statusCode);
      }
    });
  });
}

function downloadPlaylist(user, playlist) {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://api.spotify.com/v1/users/' + user.uid + '/playlists/' + playlist + '/tracks?fields=items(track(id,popularity))',
      headers: { 'Authorization': 'Bearer ' + user.access_token },
    }
    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        var tracks = []
        JSON.parse(body)['items'].forEach(item => {
          tracks.push({ id: item['track']['id'], popularity: item['track']['popularity'] });
        });
        resolve(tracks);
      } else {
        reject(error, response.statusCode);
      }
    });
  });
}

function getAudioFeatures(user, tracks) {
  return new Promise((resolve, reject) => {
    if (tracks.length > 100) {
      reject('too many tracks', null);
    }

    var options = {
      url: 'https://api.spotify.com/v1/audio-features?ids=' + tracks.join(),
      headers: { 'Authorization': 'Bearer ' + user.access_token }
    }

    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error, response.statusCode);
      }
    });
  });
}

function getRecentlyPlayed(user) {
  return new Promise((resolve, reject) => {

    var options = {
      url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
      headers: { 'Authorization': 'Bearer ' + user.access_token }
    }

    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        var tracks = [];
        JSON.parse(body)['items'].forEach(item => {
          tracks.push(item['track']['id']);
        });
        resolve(tracks);
      } else {
        reject(error, response.statusCode);
      }
    });
  });
}

function getTopTracks(user, term) {
  return new Promise((resolve, reject) => {

    var options = {
      url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=' + term,
      headers: { 'Authorization': 'Bearer ' + user.access_token }
    }

    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        var tracks = [];
        JSON.parse(body)['items'].forEach(item => {
          tracks.push(item['id']);
        });
        resolve(tracks);
      } else {
        reject(error, response.statusCode);
      }
    });
  });
}

function getTopArtists(user, term) {
  return new Promise((resolve, reject) => {

    var options = {
      url: 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=' + term,
      headers: { 'Authorization': 'Bearer ' + user.access_token }
    }

    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        var artists = [];
        JSON.parse(body)['items'].forEach(item => {
          artists.push(item['id']);
        });
        resolve(artists);
      } else {
        reject(error, response.statusCode);
      }
    });
  });
}

function getRecommendations(user, artists, genres, tracks, targets) {

  var seedCount = 0;
  seedCount += artists ? artists.length : 0;
  seedCount += genres ? genres.length : 0;
  seedCount += tracks ? tracks.length : 0;
  if(seedCount > 5) {
    reject('too many seeds', null);
  }

  if (!targets) {
    targets = []
  }

  return new Promise((resolve, reject) => {

    var url = 'https://api.spotify.com/v1/recommendations'
    url += '?limit=100'
    url += artists ? '&seed_artists=' + artists.join() : ''
    url += genres ? '&seed_genres=' + genres.join() : ''
    url += tracks ? '&seed_tracks=' + tracks.join() : ''
    targets.forEach(target => {
      url += '&target_' + target['attribute'] + '=' + target['value']
    });

    var options= {
      url: url,
      headers: { 'Authorization': 'Bearer ' + user.access_token },
    }

    request.get(options, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        var tracks = [];
        JSON.parse(body)['tracks'].forEach(track => {
          tracks.push(track['id']);
        });
        resolve(tracks);
      } else {
        reject(error, response.statusCode)
      }
    });
  });
}

module.exports = {
  refreshToken,
  uploadPlaylist,
  getUsersPlaylists,
  downloadPlaylist,
  getAudioFeatures,
  getRecentlyPlayed,
  getTopTracks,
  getTopArtists,
  getRecommendations,
}
