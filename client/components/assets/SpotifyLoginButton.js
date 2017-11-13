import React, { Component } from 'react';

class SpotifyLoginButton extends Component {
    onClick() {
        console.log("Clicked");
    }
    render() {
        return (
          <div class="btn new-playlist-button text-center">
            <a href="/home"></a>
            LOGIN WITH SPOTIFY
          </div>
        );
    }
}

export default SpotifyLoginButton;