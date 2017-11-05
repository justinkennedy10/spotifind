import React, { Component } from 'react';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import NoPlaylists from './NoPlaylists';
import Loading from './Loading';

class PlaylistList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      playlists: []
    }
  }

  componentDidMount() {
    let ref = this;
    let url = '/api/' + this.props.user_id + '/playlists';
    axios.get(url).then(function(res) {
      console.log(res);
      ref.setState({
        playlists: res.data,
        loading: false
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
      if (this.state.loading) {
        return <Loading/>;
      }
      var playlists = null;
      if (this.state.playlists.length === 0) {
        playlists = <NoPlaylists/>;
      } else {
        playlists = (
          <div className="list-group">
          {this.state.playlists.map((playlist) => (
              <PlaylistItem key={playlist.id} playlist={playlist}/>
            ))}
          </div>
        )
      }
      return (playlists);
  }
}

export default PlaylistList;
