import React, { Component } from 'react';
const uuidv4 = require('uuid/v4');
import axios from 'axios';

class CreatePlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {pid: uuidv4(), history: props.history};
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
                  <form className="editor">
                    <div className="form-group">
                      <input className="text name" className="form-control" placeholder="Playlist Name" onChange={this.selectOption.bind(this)}/>
                    </div>
                    <div className="form-group text-center">
                      {typeOptions.map(opt => (
                        <label key={opt.value} className="radio-inline">
                          <input type="radio" name="typeOptions" value={opt.value} onChange={this.selectOption.bind(this)} /> {opt.label}
                        </label>
                      ))}
                    </div>
                    <div className="form-group text-center">
                      <label className="radio-inline">
                        <input type="radio" name="sizeOptions" value="s" onChange={this.selectOption.bind(this)} /> Small (20-25 Songs)
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="sizeOptions" value="m" onChange={this.selectOption.bind(this)} /> Medium (25-50 Songs)
                      </label>
                      <label className="radio-inline">
                        <input type="radio" name="sizeOptions" value="l" onChange={this.selectOption.bind(this)} /> Large (50+ Songs)
                      </label>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <div className="btn new-playlist-button text-center"  data-dismiss="modal" onClick={this.createPlaylist.bind(this)}>
                    CONTINUE
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
    }
}

export default CreatePlaylistModal;
