import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div className="error">
        <div className="code">Error {this.props.error.code}</div>
        <div className="message">{this.props.error.message}</div>
        {this.props.children}
      </div>
    );
  }
}

export default Error;