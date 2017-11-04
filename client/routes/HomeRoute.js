import React, { Component } from 'react';
import PlaylistList from '../components/PlaylistList';
import NewPlaylistButton from '../components/NewPlaylistButton';

class PlaylistRoute extends Component {
  render() {
    return (
      <div>
        <PlaylistList />
        <div className="row">
          <NewPlaylistButton/>
        </div>
      </div>
    );
  }
}

export default PlaylistRoute;
