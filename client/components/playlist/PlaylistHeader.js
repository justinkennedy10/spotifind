import React, { Component } from 'react';

class PlaylistHeader extends Component {
  render() {
    let basicInfo;
    if(this.props.editing) {
      basicInfo = (
        <div className="playlist-header">
          <h1>Create New Playlist</h1>
        </div>
      )
    } else {
      basicInfo = (
        <div className="playlist-header">
          <h1>{ this.props.name }</h1>
          <h4>A { this.props.type } playlist</h4>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-md-6">
          {basicInfo}
        </div>
      </div>
    );
  }
}

export default PlaylistHeader;
