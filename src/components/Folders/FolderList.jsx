'use strict';
import React, { Component } from 'react';
import Folder from './Folder.js';

export default class FolderList extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    index: React.PropTypes.number,
    active: React.PropTypes.bool,
    onFolderClick: React.PropTypes.func
  }

  state = {
    //Default index is first of array
    activeIndex: 0
  }

  constructor(props) {
    super(props);

    this.handleFolderClick = this.handleFolderClick.bind(this);
  }

  handleFolderClick(index) {
    this.setState({activeIndex: index});
    let folder = this.props.folders[index];
    this.props.onListUpdate(folder.folder.name, folder.folder.path);
  }

  render() {
    let folderNodes = this.props.folders.map((folder, index) => {
      return (
        <Folder name={folder.folder.name} 
                path={folder.folder.path} 
                key={index} 
                index={index} 
                active={index===this.state.activeIndex}
                onFolderClick={this.handleFolderClick}/>
        )
      }
    );
    console.log(folderNodes);
    return (
      <ul className="folderList">
        {folderNodes}
      </ul>
    );
  }
}