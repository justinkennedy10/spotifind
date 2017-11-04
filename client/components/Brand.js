import React, { Component } from 'react';

class Brand extends Component {
    render() {
        return (
          <div className="media brand">
            <div className="media-left">
              <img className="media-object" src="https://seeklogo.com/images/S/spotify-2015-logo-560E071CB7-seeklogo.com.png"/>
            </div>
            <div className="media-body media-middle">
              <div>Spotifind</div>
            </div>
          </div>
        )
    }
}

export default Brand;