'use strict';
import React, { Component } from 'react';
import Task from './Task.js';

export default class FolderTaskList extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    folderName: React.PropTypes.string,
    folderPath: React.PropTypes.string,
    key: React.PropTypes.number
  }

  render() {
    let taskNodes = this.props.taskData.tasks.map((task, index) => (
      <Task name={task.name} 
            description={task.description} 
            folderName={this.props.taskData.folder.name}
            folderPath={this.props.taskData.folder.path}
            key={index} />
      )
    );
    console.log(taskNodes);
    return (

      <ul className="taskList">
        {taskNodes}
      </ul>
    );
  }
}
