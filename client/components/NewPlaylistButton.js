import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewPlaylistButton extends Component {
    render() {
        return (
          <Link to={'/playlist/new'}>
            <div className="btn new-playlist-button text-center pull-right">
              <div>CREATE NEW PLAYLIST</div>
            </div>
          </Link>
        )
    }
}

export default NewPlaylistButton;