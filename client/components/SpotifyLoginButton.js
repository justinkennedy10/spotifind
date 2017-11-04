import React, { Component } from 'react';

class SpotifyLoginButton extends Component {
    onClick() {
        console.log("Clicked");
    }
    render() {
        return <button onClick={this.onClick}>Button</button>;
    }
}

export default SpotifyLoginButton;