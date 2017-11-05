import React, { Component } from 'react';
import CollaboratorsList from './CollaboratorsList';
import SongList from './SongList';
import Details from './Details';
import PlaylistHeader from './PlaylistHeader';
import Loading from './Loading';
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
        ref.setState({name: playlist.name, type: playlist.type, loading: false})
      }).catch(function (err) {
        console.error(err);
      })
  }

  generatePlaylist() {
    thie.setState({
      loading: true
    })
    let ref = this;
    axios.post('/api/' + this.state.uid + '/playlists/' + this.state.pid + '/generate')
      .then(function (res) {
        ref.setState({
          loading: false,
          songs: res.data
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
      leftPanel = (
        <div>
          <div className="btn new-playlist-button text-center" onClick={this.generatePlaylist.bind(this)}>
            GENERATE
          </div>
            <iframe className="embed-responsive-item" src="https://open.spotify.com/embed/user/1216093278/playlist/3qWrpLBAQGRmzD0TvDjqYh" width="100%" height="380" frameBorder="0" allowTransparency="true"></iframe>
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
            <CollaboratorsList uid={this.state.uid} pid={this.state.pid} collaborators={ this.state.collaborators } />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistDetails;
