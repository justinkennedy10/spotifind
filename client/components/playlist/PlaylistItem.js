import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlaylistItem extends Component {
  render() {
    var playlist = this.props.playlist;
    var uid = this.props.uid;
    var linkUrl = '/playlist/' + playlist.id;

    return (
      <Link className="list-group-item row" to={linkUrl}>
        <div className="col-md-4">
          {playlist.name}
        </div>
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          {uid}
        </div>
      </Link>
    );

  }
}

export default PlaylistItem;
