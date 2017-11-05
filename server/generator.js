const spotify = require('./spotify');
const User = require('./User');
const dedupe = require('dedupe');

module.exports = {
  generatePlaylist(playlist) {
    return new Promise((resolve, reject) => {
      var seeds = getSeeds(playlist.users);
      var targets = getTargets(playlist.type);
      var user = getHost(playlist);
      getRecommendations(user, seeds, targets)
        .then(track_list => {
          track_list = orderByPopularity(track_list);
          track_list = selectTracksBySize(track_list, playlist.size)
          spotify.uploadPlaylist(user, playlist.name, track_list)
            .then(spotify_id => resolve(spotify_id))
            .catch((error, statusCode) => reject(statusCode));
        })
        .catch(err => reject(err));
    });
  }
}

function getHost(playlist) {
  var host_index = 0;
  for (var i = 0; i < playlist.users.length; i++) {
    if (playlist.users[i].uid == playlist.host_id) {
      host_index = i;
      break;
    }
  }
  return new User(playlist.host_id, playlist.users[i].access_token, playlist.users[i].refresh_token)  
}

function getSeeds(users) {
  const SEED_COUNT = 10;
  let tracks = [], artists = [], top_tracks = [];
  users.forEach(function (user) {
    tracks = tracks.concat(user.recently_played);
    top_tracks = top_tracks.concat(user.top_tracks.slice(0,SEED_COUNT));
    artists = artists.concat(user.top_artists);
  });
  tracks = orderByPopularity(tracks);
  artists = orderByPopularity(artists);
  return {
    tracks: tracks.concat(top_tracks),
    artists: artists,
    genres: []
  }
}

function getTargets(type) {
  const TYPE_VALUES = {
    'party': {
      danceability: 1.0,
      energy: 1.0,
      valence: 0.8
    },
    'road trip': {
      acousticness: 0.8,
      danceability: 0.5,
      energy: 0.6,
      valence: 0.8
    },
    'chill_hang': {
      acousticness: 1.0,
      danceability: 0.1,
      instrumentalness: 0.6
    },
    'romantic': {
      instrumentalness: 1.0,
      acousticness: 0.8,
      danceability: 0.2
    },
    'focus': {
      instrumentalness: 1.0,
      acousticness: 1.0,
      energy: 0.1
    }
  }

  let targets = [];
  for(var attr in TYPE_VALUES[type]) {
    targets.push({
      attribute: attr,
      value: TYPE_VALUES[type][attr]
    })
  }

  return targets;
}

function getRecommendations(user, seeds, targets) {
  const REC_CALLS = 15;
  const ARTISTS_PER_CALL = 2;
  const TRACKS_PER_CALL = 3;
  const GENRES_PER_CALL = 0;
  return new Promise(function(resolve, reject) {
    //Get random combinations of seeds
    var random_seeds = []
    for(var i = 0; i < REC_CALLS; i++) {
      var combination = { artists: [], genres: [], tracks: [] };
      for (var j = 0; j < ARTISTS_PER_CALL; j++) {
        combination.artists.push(seeds.artists[Math.floor(Math.random() * seeds.artists.length)]);
      }
      for (var j = 0; j < TRACKS_PER_CALL; j++) {
        combination.tracks.push(seeds.tracks[Math.floor(Math.random() * seeds.tracks.length)].id);
      }
      for (var j = 0; j < GENRES_PER_CALL; j++){
        combination.genres.push(seeds.genres[Math.floor(Math.random() * seeds.genres.length)]);
      }
      random_seeds.push(combination);
    }
    // Call /recommendations in parallel
    var calls = random_seeds.map(random_seed => {
      return new Promise((res, rej) => {
        spotify.getRecommendations(user, random_seed.artists, random_seed.genres, random_seed.tracks, targets)
          .then(tracks => res(tracks))
          .catch(err => rej(err));
      });
    }); 
    Promise.all(calls)
      // flatten tracklists and return
      .then(results => resolve(results.reduce((p,c) => p.concat(c))))
      .catch(error => reject(error));
  });
}

function orderByPopularity(track_list) {
  let counts = {};

  track_list.forEach(function (t) {
    counts[t.id] = (counts[t.id] || 0) + 1
  });

  return dedupe(track_list).sort(function (t1, t2) {
    return counts[t1.id] < counts[t2.id];
  });
}

function selectTracksBySize(track_list, size) {
  const sizes = {
    's': 25,
    'm': 50,
    'l': 100
  }

  return track_list.slice(0, sizes[size]);
}
