import React, { Component } from 'react';
import Collaborator from './Collaborator';

class CollaboratorsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: props.collaborators
    }
  }

  render() {
    return (
      <div>
        <h3 className="details-head">Collaborators</h3>
        { this.state.collaborators.map(collab => (
          <Collaborator key={collab.name} name={collab.name} image="http://placehold.it/50x50" />
        )) }
        <div className="btn new-playlist-button text-center">
          <span className="glyphicon glyphicon-plus"></span>&nbsp; ADD COLLABORATORS
        </div>
      </div>
    )
  }
}

export default CollaboratorsList;
