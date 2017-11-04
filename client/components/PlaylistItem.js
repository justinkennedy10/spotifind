import React, { Component } from 'react';

class PlaylistItem extends Component {
  render() {
    return (
      <div>
        {this.props.playlist}
      </div>
    );

  }
}

export default PlaylistItem;