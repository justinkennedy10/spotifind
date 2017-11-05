import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');
import axios from 'axios';

class CreatePlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pid: uuidv4(),
      history: props.history,
      type: "party",
      size: "s"
    };
  }

  selectOption(e) {
    if(e.target.name === 'typeOptions') {
      this.setState({
        type: e.target.value
      })
    } else if(e.target.name === 'sizeOptions'){
      this.setState({
        size: e.target.value
      })
    } else {
      this.setState({
        name: e.target.value
      })
    }
  }

  createPlaylist() {
    var historyObj = this.state.history;
    var url = `/api/${this.props.user_id}/playlists/${this.state.pid}`;
    axios.post(url, {
      name: this.state.name,
      type: this.state.type,
      size: this.state.size
    }).then((res) => {
      historyObj.push('/playlist/' + this.state.pid);
    }).catch((err) => {
      console.log(err);
    });
  }

    render() {
      const typeOptions = [{
        value: 'party',
        label: 'Party'
      }, {
        value: 'road trip',
        label: 'Road Trip'
      }, {
        value: 'chill hang',
        label: 'Chill Hang'
      }, {
        value: 'romantic',
        label: 'Romantic'
      }, {
        value: 'focus',
        label: 'Focus'
      }];

        return (
           <div id="createPlaylistModal" className="modal fade new-playlist" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
              <div className="modal-body">
                <div className="name">
                  <input className="text name" className="form-control" placeholder="Playlist Name" onChange={this.selectOption.bind(this)}/>
                </div>
              <div class="row dropdown-row">
                <div class="col-xs-6 text-center">
                  <div class="dropdown-label">Type:</div>
                  <select name="typeOptions" onChange={this.selectOption.bind(this)}>
                    {typeOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                  </select>
                </div>
                <div class="col-xs-6 text-center">
                  <div class="dropdown-label">Size:</div>
                  <select name="sizeOptions" onChange={this.selectOption.bind(this)}>
                    <option value="s">Small (25 songs)</option>
                    <option value="m">Medium (50 songs)</option>
                    <option value="l">Large (100 songs)</option>
                  </select>
                </div>
              </div>
              <hr/>
              <div class="media">
                <div class="media-left">
                  <div class="media-object">
                    <div className="btn new-playlist-button text-center"  data-dismiss="modal" onClick={this.createPlaylist.bind(this)}>
                      CONTINUE
                    </div>
                  </div>
                </div>
                <div class="media-body media-middle">
                  <div class="">
                    Next: invite friends
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}





export default CreatePlaylistModal;

