import React, { Component } from 'react';
import SpotifyLoginButton from '../components/assets/SpotifyLoginButton';
import { Redirect } from 'react-router'
import axios from 'axios';

class InviteeRoute extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: "pending"
    }
  }

  componentWillMount() {
    var invite_code = this.props.match.params.code;
    axios.post('/api/invite/validate', {
      invite_code: invite_code
    }).then((res) => {
      console.log(res);
      this.setState({status: res.data.status})
    }).catch((err) => {
      this.setState({status: err.response.data.status})
    });
  }


  render() {
      return <Redirect to='/home'/>;
  }
}

export default InviteeRoute;
