import React, { Component } from 'react';
import PlaylistList from '../components/PlaylistList';
import NewPlaylistButton from '../components/NewPlaylistButton';

class PlaylistRoute extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <NewPlaylistButton/>
        </div>
        <PlaylistList user_id={this.props.user_id}/>
      </div>
    );
  }
}

export default PlaylistRoute;
