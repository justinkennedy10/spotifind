import React, { Component } from 'react';

class SongList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    }
  }
  render() {
    let songs = [{
      name: "Song 1",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 2",
      artist: "Matthew Bass",
      duration: '01:35'
    }, {
      name: "Song 3",
      artist: "Andrew Matthew",
      duration: '01:35'
    }, {
      name: "Song 4",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 5",
      artist: "Bass Bass",
      duration: '01:35'
    }, {
      name: "Song 6",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 7",
      artist: "Andrew Andrew",
      duration: '01:35'
    }, {
      name: "Song 8",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 9",
      artist: "MatthewMatthew Bass",
      duration: '01:35'
    }, {
      name: "Song 10",
      artist: "Andrew MatthewMatthew",
      duration: '01:35'
    }, {
      name: "Song 11",
      artist: "Andrew Matthew",
      duration: '01:35'
    }, {
      name: "Song 12",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 13",
      artist: "MatthewMatthewMatthew Bass",
      duration: '01:35'
    }, {
      name: "Song 14",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "SongSongSongSongSongSong 15",
      artist: "Andrew MatthewMatthewMatthewMatthew",
      duration: '01:35'
    }]
    return (
      <div className="song-list">
        {songs.map(song => (
          <div key={song.name}>
            <div className="song">
              <span className="duration">{song.duration}</span>
              <span className="name">{song.name}</span>
              <span className="artist">{song.artist}</span>
            </div>
            <hr/>
          </div>
        ))}
      </div>
    )
  }
}

export default SongList;
