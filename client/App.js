import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import SpotifyLoginButton from './components/SpotifyLoginButton';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div>
              <h1>Hello world</h1>
              <SpotifyLoginButton></SpotifyLoginButton>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
