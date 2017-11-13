import React, { Component } from 'react';
import PlaylistList from '../components/playlist/PlaylistList';
import NewPlaylistButton from '../components/playlist/NewPlaylistButton';
import CreatePlaylistModal from '../components/playlist/CreatePlaylistModal';

class PlaylistRoute extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <NewPlaylistButton/>
        </div>
        <CreatePlaylistModal user_id={this.props.user_id} history={this.props.history}/>
        <PlaylistList history={this.props.history} user_id={this.props.user_id}/>
      </div>
    );
  }
}

export default PlaylistRoute;
