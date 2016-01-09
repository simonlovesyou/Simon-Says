'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import db from '../../db';
const FolderList = require('./FolderList.js').default;
const TaskList = require('./TaskList.js').default;

console.log(FolderList);
console.log(TaskList);

window.$ = window.jQuery = require('jquery');

export default class Folders extends Component {
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  state = {
    folders: db('folders').toArray(),
    tasks: {
                folder: db('folders').toArray()[0].folder,
                tasks: db('folders').toArray()[0].tasks
              }
  }

  constructor (props) {
    super(props);
    this._bind(['handleListUpdate']);
  }

  handleListUpdate(name, path) {
    this.setState({tasks: db('folders').find({folder:{name: name, path: path}}).tasks})
  }

  render() {
    return (
      <div className="folderTaskBox">
        <FolderList 
          folders={this.state.folders} 
          onListUpdate={this.handleListUpdate}/>
        <TaskList taskData={this.state.tasks} />
      </div>
    );
  }
}

ReactDOM.render(
  <Folders />,
  document.getElementById('root')
);