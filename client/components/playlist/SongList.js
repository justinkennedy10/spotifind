import React, { Component } from 'react';

class SongList extends Component {
  render() {
    return (
      <div className="song-list">
        {this.props.songs.map(song => (
          <div key={song.id}>
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
