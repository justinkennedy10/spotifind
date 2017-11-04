import React, { Component } from 'react';
import PlaylistDetails from '../components/PlaylistDetails';
import Loading from '../components/Loading';
import axios from 'axios';

class PlaylistRoute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlist: {},
      isLoading: !props.editing,
    }
  }

  componentDidMount() {
    let ref = this;
    if(!this.props.editing) {
      axios.get('/api/playlist/' + this.props.match.params.id)
        .then(function (res) {
          ref.setState({playlist: res.data[0], isLoading: false})
        }).catch(function (err) {
          console.error(err);
        })
    }
  }

  onClick() {
    axios.post('/api/invite', {
      playlistId: "11111111",
      inviteeList: [
        1235,
        1213434,
        23234,
      ]
    }).then(function(res) {
      console.log(res);
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading/>;
    } else {
      return (
        <div>
          <PlaylistDetails playlist={this.state.playlist} editing={this.props.editing} />
          <button onClick={this.onClick}>Test Invites Code</button>
        </div>
      );
    }
  }
}

export default PlaylistRoute;
