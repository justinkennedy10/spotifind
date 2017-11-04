import React, { Component } from 'react';
import CollaboratorsList from './CollaboratorsList';
import SongList from './SongList';
import Details from './Details';
import PlaylistHeader from './PlaylistHeader';
import axios from 'axios';
import uuid from 'uuid';

class PlaylistDetails extends Component {

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

  savePlaylist(pid) {
    //save in db.then()
    // window.location.pathname = '/playlist/' + pid
  }

  render() {
    let songs = [{
      name: "Song 1",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 2",
      artist: "Matthew Bass",
      duration: '01:35'
    }, {
      name: "Song 3",
      artist: "Andrew Matthew",
      duration: '01:35'
    }, {
      name: "Song 4",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 5",
      artist: "Bass Bass",
      duration: '01:35'
    }, {
      name: "Song 6",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 7",
      artist: "Andrew Andrew",
      duration: '01:35'
    }, {
      name: "Song 8",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 9",
      artist: "MatthewMatthew Bass",
      duration: '01:35'
    }, {
      name: "Song 10",
      artist: "Andrew MatthewMatthew",
      duration: '01:35'
    }, {
      name: "Song 11",
      artist: "Andrew Matthew",
      duration: '01:35'
    }, {
      name: "Song 12",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "Song 13",
      artist: "MatthewMatthewMatthew Bass",
      duration: '01:35'
    }, {
      name: "Song 14",
      artist: "Andrew Bass",
      duration: '01:35'
    }, {
      name: "SongSongSongSongSongSong 15",
      artist: "Andrew MatthewMatthewMatthewMatthew",
      duration: '01:35'
    }]
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
    const collaborators = [{
      id: 1,
      name: 'Matthew Gramigna',
      contributions: {}
    }, {
      id: 2,
      name: 'Justin Kennedy',
      contributions: {}
    }, {
      id: 3,
      name: 'Andrew Bass',
      contributions: {}
    }, {
      id: 4,
      name: 'Alex Karle',
      contributions: {}
    }, ]
    let leftPanel;

    if(!this.props.editing) {
      leftPanel = (
        <SongList songs={songs}/>
      )
    } else {
      let pid = uuid();
      let url = '/playlist/' + pid + '?new=true';
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
              <input type="radio" name="sizeOptions" value="s" onChange={this.selectOption.bind(this)} /> Small ()
            </label>
            <label className="radio-inline">
              <input type="radio" name="sizeOptions" value="m" onChange={this.selectOption.bind(this)} /> Medium ()
            </label>
            <label className="radio-inline">
              <input type="radio" name="sizeOptions" value="l" onChange={this.selectOption.bind(this)} /> Large ()
            </label>
          </div>
          <div className="form-group">
            <div className="btn new-playlist-button text-center" onClick={this.savePlaylist.bind(this, pid)}>
              CONTINUE
            </div>
          </div>
        </form>
      )
    }
    let collabs;
    if(!this.props.editing) {
      collabs = <CollaboratorsList pid={this.props.playlist.id} editing={ this.props.editing } collaborators={ collaborators } />
    } else {
      collabs = (<h3>Save settings to add collaborators</h3>)
    }
    return (
      <div className="container">
        <PlaylistHeader editing={ this.props.editing } name={ this.props.playlist.name } type={this.props.playlist.type} />
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
