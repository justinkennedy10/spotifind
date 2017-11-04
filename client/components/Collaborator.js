import React, { Component } from 'react';
import axios from 'axios'

class Collaborator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: null,
      newCollab: props.newCollab
    }
  }
  setPhoneNumber(e) {
    this.setState({
      phone: e.target.value,
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
    this.setState({newCollab: false})
  }

  render() {
    let collab;
    if(this.state.newCollab) {
      collab = (
        <div className="input-group">
          <input className="text" className="form-control" placeholder="Enter a Phone Number" onChange={this.setPhoneNumber.bind(this)}/>
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
            <h4>{this.props.name || this.state.phone}</h4>
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
