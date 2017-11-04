import React, { Component } from 'react';

class SpotifyLoginButton extends Component {
    onClick() {
        console.log("Clicked");
    }
    render() {
        return <a href="/home">Login</a>;
    }
}

export default SpotifyLoginButton;