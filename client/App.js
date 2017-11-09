import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import axios from 'axios';
import HomeRoute from './routes/HomeRoute.js';
import PlaylistRoute from './routes/PlaylistRoute';
import InviteeRoute from './routes/InviteeRoute';
import Brand from './components/Brand';
import Loading from './components/Loading';
import NotFoundError from './components/errors/NotFoundError';
import uuid from 'uuid';

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
    axios.get('/api/me').then(function(res) {
      console.log(res.data);
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
                <Route path="/home" render={(route) => <HomeRoute user_id={this.state.user_id} history={route.history}/>}/>
                <Route path="/invite/:code" render={(route) => <InviteeRoute user_id={this.state.user_id} match={route.match}/>}/>
                <Route exact path="/create" render={(route) => <PlaylistRoute match={route.match} pid={uuid()} history={route.history} user_id={this.state.user_id} />} />
                <Route path="/playlist/:id" render={(route) => <PlaylistRoute match={route.match} user_id={this.state.user_id} />} />
                <Route path="*" render={() => <NotFoundError/>} />
              </Switch>
            </div>
          </Router>
        );
      }
    }
}

export default App;
