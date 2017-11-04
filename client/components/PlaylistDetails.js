import React, { Component } from 'react';
import CollaboratorsList from './CollaboratorsList';
import SongList from './SongList';
import Details from './Details';
import PlaylistHeader from './PlaylistHeader';
import axios from 'axios';

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

  generatePlaylist() {
    console.log(this.state);
    //make axios call
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
    const collaborators = [{
      name: 'Matthew Gramigna',
      contributions: {}
    }, {
      name: 'Justin Kennedy',
      contributions: {}
    }, {
      name: 'Andrew Bass',
      contributions: {}
    }, {
      name: 'Alex Karle',
      contributions: {}
    }, ]
    let leftPanel;
    if(!this.props.editing) {
      leftPanel = (
        <SongList />
      )
    } else {
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
            <div className="btn new-playlist-button text-center" onClick={this.generatePlaylist.bind(this)}>
              GENERATE
            </div>
          </div>
        </form>
      )
    }
    return (
      <div className="container">
        <PlaylistHeader editing={ this.props.editing } name={ this.props.playlist.name } type={this.props.playlist.type} />
        <div className="row">
          <div className="col-md-6">
            {leftPanel}
          </div>
          <div className="col-md-4 col-md-offset-2">
            <CollaboratorsList editing={ this.props.editing } collaborators={ collaborators } />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistDetails;
