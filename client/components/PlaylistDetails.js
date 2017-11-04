import React, { Component } from 'react';
import CollaboratorsList from './CollaboratorsList';
import SongList from './SongList';
import Details from './Details';

class PlaylistDetails extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="playlist-header">
              <h1>{ this.props.playlist.name }</h1>
              <h4>A { this.props.playlist.type } playlist</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <SongList />
          </div>
          <div className="col-md-4 col-md-offset-2">
            <div className="row">
              <CollaboratorsList />
            </div>
            <div className="row">
              <Details />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistDetails;
