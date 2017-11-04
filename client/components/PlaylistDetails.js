import React, { Component } from 'react';

class PlaylistDetails extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.playlist.name}</h1>
        <h2>{this.props.playlist.type}</h2>
      </div>
    );
  }
}

export default PlaylistDetails;
