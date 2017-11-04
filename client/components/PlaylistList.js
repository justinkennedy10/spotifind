import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem';

class PlaylistList extends Component {
    render() {
        var playlists = ['Test', 'Test2'];
        return (
          <div class="playlist-list">
          {playlists.map((playlist) => (
              <PlaylistItem playlist={playlist}/>
            ))}
          </div>
        );
    }
}

export default PlaylistList;