import React, { Component } from 'react';
import axios from 'axios'

class Collaborator extends Component {
  setPhoneNumber(e) {
    this.setState({
      phone: e.target.value
    })
  }

  invite() {
    const ref = this;
    axios.post('/api/invite', {
      playlistId: ref.props.pid,
      inviteeList: [ ref.state.phone ]
    }).then(function(res) {
      console.log(res);
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    let collab;
    if(this.props.newCollab) {
      collab = (
        <div className="input-group">
          <input className="text" className="form-control" placeholder={this.props.name} onChange={this.setPhoneNumber.bind(this)}/>
          <span className="input-group-btn">
            <button className="btn btn-success" onClick={this.invite.bind(this)}>
              <i className="glyphicon glyphicon-send"></i>
            </button>
          </span>
        </div>
      )
    } else {
      collab = (
        <div className="media">
          <div className="media-left">
            <a href="#">
              <img className="media-object img-circle" src={ this.props.image } />
            </a>
          </div>
          <div className="media-body media-middle">
            <h3>{this.props.name}</h3>
          </div>
        </div>
      )
    }
    return (
      <div className="collaborator">
        {collab}
      </div>
    )
  }
}

export default Collaborator;
