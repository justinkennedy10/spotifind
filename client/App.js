import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import PlaylistItem from './components/PlaylistItem';
import HomeRoute from './routes/HomeRoute.js';
import PlaylistRoute from './routes/PlaylistRoute.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/home" component={HomeRoute}/>
          <Route path="/playlists" component={PlaylistRoute}/>
        </div>
      </Router>
    );
  }
}

export default App;
