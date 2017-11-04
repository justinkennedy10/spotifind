import React, { Component } from 'react';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';

class PlaylistList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
  }

  componentDidMount() {
    let ref = this;
    axios.get('/api/mgramigna4/playlists').then(function(res) {
      ref.setState({playlists: res.data});
    });
  }

  render() {
      return (
        <div className="playlist-list">
        {this.state.playlists.map((playlist) => (
            <PlaylistItem key={playlist.id} playlist={playlist}/>
          ))}
        </div>
      );
  }
}

export default PlaylistList;