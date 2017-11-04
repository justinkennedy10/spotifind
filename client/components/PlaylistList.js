import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem';

class PlaylistList extends Component {
    render() {
        var playlists = [{
          "id": 1,
          "name": "Playlist1",
          "members": "Jonh, Justn",
          "dateCreated": "10-24-16",
        },
        {
          "id": 2,
          "name": "Playlist2",
          "members": "Jonh, Mike",
          "dateCreated": "9-2-17",
        }];
        return (
          <div className="playlist-list container">
          {playlists.map((playlist) => (
              <PlaylistItem key={playlist.id} playlist={playlist}/>
            ))}
          </div>
        );
    }
}

export default PlaylistList;