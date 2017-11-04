import React, { Component } from 'react';
import CollaboratorsList from './CollaboratorsList';
import SongList from './SongList';
import Details from './Details';
import PlaylistHeader from './PlaylistHeader'

class PlaylistDetails extends Component {
  render() {
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
            <input className="text" className="form-control" placeholder="Playlist Name" />
          </div>
          <div className="form-group text-center">
            <label className="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> Party
            </label>
            <label className="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> Road Trip
            </label>
            <label className="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" /> Chill Hang
            </label>
            <label className="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4" /> Romantic
            </label>
            <label className="radio-inline">
              <input type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option5" /> Focus
            </label>
          </div>
          <div className="form-group">
            <div className="btn new-playlist-button text-center">
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
