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

    if(props.history && !props.editing) {
      this.state = {
        playlist: {
          id: props.history.location.state.id,
          name: props.history.location.state.name,
          type: props.history.location.state.type
        },
        songs: props.songs || []
      }
    } else {
      this.state = {
        playlist: props.playlist,
        songs: props.songs || []
      }
    }
  }

  selectOption(e) {
    if(e.target.name === 'typeOptions') {
      this.setState({
        type: e.target.value
      })
    } else if(e.target.name === 'sizeOptions'){
      this.setState({
        size: e.target.value
      })
    } else {
      this.setState({
        name: e.target.value
      })
    }
  }

  savePlaylist() {
    const pid = uuid();
    let ref = this;
    const endpoint = `/api/${this.props.uid}/playlists/${pid}`;
    axios.post(endpoint, {
      name: ref.state.name,
      type: ref.state.type,
      size: ref.state.size
    }).then(function (res) {
      ref.props.history.push({
        pathname: '/playlist/' + pid,
        state: { id: pid,  name: ref.state.name, type: ref.state.type }
      })
    }).catch(function (err) {
    })
  }

  generatePlaylist() {
    this.setState({
      loading: true
    })
    let ref = this;
    axios.post('/api/' + this.props.uid + '/playlists/' + this.state.playlist.id + '/generate')
      .then(function (res) {
        console.log(res);
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
    let collabs;
    if(this.state.loading) {
      leftPanel = <Loading />
    } else if(!this.props.editing) {
      leftPanel = (
        <div>
          <div className="btn new-playlist-button text-center" onClick={this.generatePlaylist.bind(this)}>
            GENERATE
          </div>
          <SongList songs={this.state.songs}/>
        </div>
      )
      collabs = <CollaboratorsList uid={this.props.uid} pid={this.state.playlist.id} editing={ this.props.editing } collaborators={ this.state.collaborators } />
    } else {
      collabs = (<h3>Save settings to add collaborators</h3>)
      leftPanel = (
        <form className="editor">
          <div className="form-group">
            <input className="text" className="form-control" placeholder="Playlist Name" onChange={this.selectOption.bind(this)}/>
          </div>
          <div className="form-group text-center">
            {typeOptions.map(opt => (
              <label key={opt.value} className="radio-inline">
                <input type="radio" name="typeOptions" value={opt.value} onChange={this.selectOption.bind(this)} /> {opt.label}
              </label>
            ))}
          </div>
          <div className="form-group text-center">
            <label className="radio-inline">
              <input type="radio" name="sizeOptions" value="s" onChange={this.selectOption.bind(this)} /> Small (20-25 Songs)
            </label>
            <label className="radio-inline">
              <input type="radio" name="sizeOptions" value="m" onChange={this.selectOption.bind(this)} /> Medium (25-50 Songs)
            </label>
            <label className="radio-inline">
              <input type="radio" name="sizeOptions" value="l" onChange={this.selectOption.bind(this)} /> Large (50+ Songs)
            </label>
          </div>
          <div className="form-group">
            <div className="btn new-playlist-button text-center" onClick={this.savePlaylist.bind(this)}>
              CONTINUE
            </div>
          </div>
        </form>
      )
    }
    return (
      <div className="container">
        <PlaylistHeader editing={ this.props.editing } name={ this.state.name || this.props.playlist.name } type={this.state.type || this.props.playlist.type} />
        <div className="row">
          <div className="col-md-6">
            {leftPanel}
          </div>
          <div className="col-md-4 col-md-offset-2">
            {collabs}
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistDetails;
