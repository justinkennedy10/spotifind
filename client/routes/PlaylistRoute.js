import React, { Component } from 'react';
import PlaylistDetails from '../components/PlaylistDetails';
import Loading from '../components/Loading';
import axios from 'axios';

class PlaylistRoute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlist: {
        id: props.pid
      },
      isLoading: !props.editing
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

  render() {
    if (this.state.isLoading) {
      return <Loading/>;
    } else {
      return (
        <div>
          <PlaylistDetails history={this.props.history} uid={this.props.user_id} playlist={this.state.playlist} editing={this.props.editing} />
        </div>
      );
    }
  }
}

export default PlaylistRoute;
