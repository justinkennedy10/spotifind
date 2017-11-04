import React, { Component } from 'react';
import PlaylistList from '../components/PlaylistList';
import NewPlaylistButton from '../components/NewPlaylistButton';

class PlaylistRoute extends Component {
  render() {
    return (
      <div>
        <PlaylistList user_id={this.props.user_id}/>
        <div className="row">
          <NewPlaylistButton/>
        </div>
      </div>
    );
  }
}

export default PlaylistRoute;
