import React, { Component } from 'react';
import SpotifyLoginButton from '../components/SpotifyLoginButton';

class InviteeRoute extends Component {

  componentWillMount() {

  }


  render() {
    return (
      <div class="container">
        <div class="invitee-description">
        You were invited by Andrew Bass to create a playlist based on your
        shared musical tastes.  Please login with Spotify to continue.
        </div>
      </div>
    );
  }
}

export default InviteeRoute;