import React, { Component } from 'react';
import Collaborator from './Collaborator';
import uuid from 'uuid';

class CollaboratorsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: props.collaborators
    }
  }

  addCollaborator() {
    this.state.collaborators.push({
      id: uuid(),
      name: null,
      newCollab: true
    })
    this.setState({
      collaborators: this.state.collaborators
    })
  }

  render() {
    return (
      <div>
        <h3 className="details-head">Collaborators</h3>
        { this.state.collaborators.map(collab => (
          <Collaborator pid={this.props.pid} newCollab={collab.newCollab} key={collab.id} name={collab.name} image="http://placehold.it/50x50" />
        )) }
        <div className="btn new-playlist-button text-center" onClick={this.addCollaborator.bind(this)}>
          <span className="glyphicon glyphicon-plus"></span>&nbsp; ADD COLLABORATORS
        </div>
      </div>
    )
  }
}

export default CollaboratorsList;
