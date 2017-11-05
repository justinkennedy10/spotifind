const spotify = require('./spotify');
const User = require('./User');
const dedupe = require('dedupe');

const SIZES = {
    's': 25,
    'm': 50,
    'l': 100
  }

const PERCENTAGE_FAMILIAR = 0.50;
const PERCENTAGE_NEW = 0.50;

module.exports = {
  generatePlaylist(playlist) {
    return new Promise((resolve, reject) => {

      var familiar_size = PERCENTAGE_FAMILIAR * SIZES[playlist.size];
      var new_size = PERCENTAGE_NEW * SIZES[playlist.size];

      var seeds = getSeeds(playlist.users);
      var targets = getTargets(playlist.type);
      var user = getHost(playlist);
     
      var tracks = getFamiliarTracks(playlist.users, targets, familiar_size);
 
      getRecommendations(user, seeds, targets)
        .then(track_list => {
          track_list = orderByPopularity(track_list);
          tracks += selectTracksBySize(track_list, new_size)
          tracks = shuffle(dedupe(tracks));
          spotify.uploadPlaylist(user, playlist.name, tracks)
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getFamiliarTracks(users, targets, size) {
  tracks = [];
  users.forEach(user => {
    tracks += user.recently_played;
    tracks += user.top_tracks;
  });
  tracks = shuffle(tracks);
  tracks = orderByPopularity(tracks);
  return tracks.slice(0, size); 
}

function getSeeds(users) {
  const TRACKS_SEED_COUNT = 20;
  const ARTISTS_SEED_COUNT = 20;
  let tracks = [], artists = [];
  users.forEach(function (user) {
    tracks = tracks.concat(user.recently_played).concat(user.top_tracks);
    artists = artists.concat(user.top_artists);
  });
  tracks = shuffle(tracks);
  artists = shuffle(artists);
  tracks = orderByPopularity(tracks);
  artists = orderByPopularity(artists);
  return {
    tracks: tracks.slice(0, TRACKS_SEED_COUNT),
    artists: artists.slice(0, ARTISTS_SEED_COUNT),
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
  const REC_CALLS = 20;
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
  return track_list.slice(0, SIZES[size]);
}
