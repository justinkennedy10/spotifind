import React, { Component } from 'react';
import CollaboratorsList from '../collaborators/CollaboratorsList';
import SongList from './SongList';
import Details from './Details';
import PlaylistHeader from './PlaylistHeader';
import Loading from '../assets/Loading';
import axios from 'axios';
import uuid from 'uuid';

class PlaylistDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pid: props.pid,
      uid: props.uid
    }
  }

  componentWillMount() {
    let ref = this;
    if(!this.state.uid) {
      axios.get('/api/me').then(function(res) {
        ref.setState({
          uid: res.data.id
        })
      });
    }
    axios.get('/api/playlist/' + ref.state.pid)
      .then(function (res) {
        const playlist = res.data[0];
        ref.setState({name: playlist.name, type: playlist.type, spotify_pid: playlist.spotify_pid, loading: false})
      }).catch(function (err) {
        console.error(err);
      })
  }

  generatePlaylist() {
    this.setState({
      loading: true
    })
    let ref = this;
    axios.post('/api/' + this.state.uid + '/playlists/' + this.state.pid + '/generate')
      .then(function (res) {
        ref.setState({
          loading: false,
          spotify_pid: res.data
        })
      })
  }

  render() {
    const typeOptions = [{
      value: 'party',
      label: 'Party'
    }, {
      value: 'road trip',
      label: 'Road Trip'
    }, {
      value: 'chill hang',
      label: 'Chill Hang'
    }, {
      value: 'romantic',
      label: 'Romantic'
    }, {
      value: 'focus',
      label: 'Focus'
    }]

    let leftPanel;

    if(this.state.loading) {
      leftPanel = <Loading />
    } else {
      var left = null;
      if (this.state.spotify_pid) {
        let playlistSrc = `https://open.spotify.com/embed/user/${this.state.uid}/playlist/${this.state.spotify_pid}`;
        left = (<iframe className="embed-responsive-item" src={playlistSrc} width="100%" height="500" frameBorder="0" allowTransparency="true"></iframe>);
      } else {
        left = (
          <div>
            <div className="generate-info">Add collaborators, wait for them to accept the invite, then generate a playlist based on your listening habits.</div>
            <div className="btn new-playlist-button text-center" onClick={this.generatePlaylist.bind(this)}>
              GENERATE
            </div>
          </div>);
      }
      leftPanel = (
        <div class="left-panel">
          {left}
        </div>
      )
    }
    return (
      <div className="container">
        <PlaylistHeader name={ this.state.name } type={ this.state.type } />
        <div className="row">
          <div className="col-md-6">
            {leftPanel}
          </div>
          <div className="col-md-4 col-md-offset-2">
            <CollaboratorsList uid={this.state.uid} pid={this.state.pid} />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistDetails;
