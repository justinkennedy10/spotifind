import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewPlaylistButton extends Component {
    render() {
        return (
          <div data-toggle="modal" data-target="#createPlaylistModal">
            <div className="btn new-playlist-button text-center pull-right">
              <div>CREATE NEW PLAYLIST</div>
            </div>
          </div>
        )
    }
}

export default NewPlaylistButton;
