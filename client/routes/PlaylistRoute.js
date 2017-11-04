import React, { Component } from 'react';
import PlaylistDetails from '../components/PlaylistDetails';
import axios from 'axios';

class PlaylistRoute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlist: {}
    }
  }

  componentDidMount() {
    let ref = this;
    axios.get('/api/playlist/' + this.props.match.params.id)
      .then(function (res) {
        ref.setState({playlist: res.data[0]})
      }).catch(function (err) {
        console.error(err);
      })
  }

  render() {
    return <PlaylistDetails playlist={this.state.playlist} />;
  }
}

export default PlaylistRoute;
