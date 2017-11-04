import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import PlaylistItem from './components/PlaylistItem';
import HomeRoute from './routes/HomeRoute.js';
import PlaylistRoute from './routes/PlaylistRoute.js';
import Brand from './components/Brand.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div class="container">
          <Brand/>
          <Route path="/home" component={HomeRoute}/>
          <Route path="/playlist/:id" component={PlaylistRoute}/>
        </div>
      </Router>
    );
  }
}

export default App;
