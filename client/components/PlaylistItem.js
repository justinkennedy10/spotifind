import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlaylistItem extends Component {
  render() {
    var playlist = this.props.playlist;
    var linkUrl = '/playlist/' + playlist.id;
    return (
      <Link to={linkUrl}>
          <div className="row playlist">
            <div className="name col-sm-4 col-xs-6">{playlist.name}</div>
            <div className="members col-sm-4 col-xs-6">{playlist.members}</div>
            <div className="date-created col-sm-4 hidden-xs">{playlist.dateCreated}</div>
        </div>
      </Link>
    );

  }
}

export default PlaylistItem;