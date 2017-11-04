import React, { Component } from 'react';

class Collaborator extends Component {
  render() {
    return (
      <div className="collaborator">
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object img-circle" src={ this.props.image } />
            </a>
          </div>
          <div className="media-body media-middle">
            <h4 className="media-heading">{ this.props.name }</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default Collaborator;
