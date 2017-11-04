import React, { Component } from 'react';

class CollaboratorsList extends Component {
  render() {
    let collaborators = [{
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
    return (
      <div>
        <h3 className="details-head">Collaborators</h3>
        { collaborators.map(collab => (
          <div key={collab.name} className="collaborator">
            <div className="media">
              <div className="media-left">
                <a href="#">
                  <img className="media-object img-circle" src="http://placehold.it/50x50" />
                </a>
              </div>
              <div className="media-body media-middle">
                <h4 className="media-heading">{ collab.name }</h4>
              </div>
            </div>
          </div>
        )) }
      </div>
    )
  }
}

export default CollaboratorsList;
