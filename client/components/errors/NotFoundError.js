import React, { Component } from 'react';
import Error from './Error';

class NotFoundError extends Component {
  render() {
    var error = {
      code: 404,
      message: "We can't seem to find what you are looking for."
    };
    return (
      <Error error={error}>
        <div className="error song">
          <iframe src="https://open.spotify.com/embed/track/5zTzDqrEmseqL2G8ElgBu7?view=list" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
        </div>
      </Error>
    );
  }
}

export default NotFoundError;