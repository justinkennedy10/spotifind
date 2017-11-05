import React, { Component } from 'react';
import Collaborator from './Collaborator';
import uuid from 'uuid';
import axios from 'axios';

class CollaboratorsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: []
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

  componentWillMount() {
    let ref = this;
    axios.get('/api/playlist/' + this.props.pid + '/collaborators')
      .then(function (res) {
        ref.setState({
          collaborators: res.data.map(function (c) {
            return {
              id: uuid(),
              phone: c.phone,
              spotifyId: c.spotify_id
            }
          })
        })
      })
  }

  render() {
    return (
      <div>
        <h3 className="details-head">Collaborators</h3>
        { this.state.collaborators.map(collab => (
          <Collaborator uid={this.props.uid} pid={this.props.pid} newCollab={collab.newCollab} key={collab.id} phone={collab.phone} spotifyId={collab.spotifyId} image="http://placehold.it/50x50" />
        )) }
        <div className="btn new-playlist-button text-center" onClick={this.addCollaborator.bind(this)}>
          <span className="glyphicon glyphicon-plus"></span>&nbsp; ADD COLLABORATORS
        </div>
      </div>
    )
  }
}

export default CollaboratorsList;
