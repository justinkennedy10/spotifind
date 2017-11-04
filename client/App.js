import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <h1>Hello world</h1>
      </MuiThemeProvider>
    );
  }
}

export default App;
