import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import PlaylistItem from './components/PlaylistItem';
import HomeRoute from './routes/HomeRoute.js';
import PlaylistRoute from './routes/PlaylistRoute.js';
import Brand from './components/Brand.js';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: -1,
      isLoading: true,
    }
  }
  componentWillMount() {
    var ref = this;
    axios.get('api/me').then(function(res) {
      ref.setState({user_id: res.data.id, isLoading:false});
    });
  }

  render() {
      if (this.state.isLoading) {
        return <Loading/>;
      } else {
        return (
          <Router>
            <div className="container">
              <Brand/>
              <Route path="/home" render={() => <HomeRoute user_id={this.state.user_id} />}/>
              <Route path="/playlist/:id" component={PlaylistRoute}/>
            </div>
          </Router>
        );
      }
    }
}

export default App;
