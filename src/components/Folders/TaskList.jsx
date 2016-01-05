'use strict';
import React, { Component } from 'react';
import Task from './Task.js';

export default class FolderTaskList extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    key: React.PropTypes.number
  }

  render() {
    let taskNodes = this.props.tasks.map((task, index) => (
      <Task name={task.name} 
            description={task.description} 
            key={index} />
      )
    );

    return (
      <ul className="taskList">
        {taskNodes}
      </ul>
    );
  }
}
