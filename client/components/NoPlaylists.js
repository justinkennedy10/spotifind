import React, { Component } from 'react';

class NoPlaylists extends Component {
    render() {
      var message = "Looks like you're new here.  Create a playlist to get started.";
      return (
        <div className="no-playlists text-center">
          <div>{message}</div>
        </div>
      )
    }
}

export default NoPlaylists;