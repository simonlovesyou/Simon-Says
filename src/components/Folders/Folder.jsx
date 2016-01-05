import React, { Component } from 'react';

export default class Folder extends Component {
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  static propTypes = {
    className: React.PropTypes.string,
    active: React.PropTypes.bool,
    onClick: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    }

    this._bind(['handleOnClick']);
  }

  handleOnClick(e) {
    this.setState({active: true});
    this.props.onFolderClick(this.props.index);
  }

  render() {
    return (
      <li>
        <div className="folder" 
             active={this.props.active} 
             onClick={this.handleOnClick.bind(this)}>

          <h3 className="folderName">
            {this.props.name}
          </h3>
          <p> <i> {this.props.path} </i> </p>
        </div>
      </li>
    );
  }
}