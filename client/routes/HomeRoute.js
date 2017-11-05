import React, { Component } from 'react';
import PlaylistList from '../components/PlaylistList';
import NewPlaylistButton from '../components/NewPlaylistButton';
import CreatePlaylistModal from '../components/CreatePlaylistModal';

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
