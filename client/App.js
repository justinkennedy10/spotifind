import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import axios from 'axios';
import HomeRoute from './routes/HomeRoute.js';
import PlaylistRoute from './routes/PlaylistRoute';
import InviteeRoute from './routes/InviteeRoute';
import Brand from './components/Brand';
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
              <Switch>
                <Route path="/home" render={() => <HomeRoute user_id={this.state.user_id} />}/>
                <Route exact path="/playlist/new" render={() => <PlaylistRoute editing={ true } />} />
                <Route path="/invite/:code" render={() => <InviteeRoute />}/>
                <Route path="/playlist/:id" component={PlaylistRoute} />
              </Switch>
            </div>
          </Router>
        );
      }
    }
}

export default App;
