import React, { Component } from 'react';
import PlaylistDetails from '../components/PlaylistDetails';
import axios from 'axios';

class PlaylistRoute extends Component {

  render() {
    return (
      <div>
        <PlaylistDetails pid={this.props.match.params.id} uid={this.props.user_id} />
      </div>
    );
  }
}

export default PlaylistRoute;
