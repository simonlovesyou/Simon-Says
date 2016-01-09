'use strict';
import React, { Component } from 'react';

export default class Task extends Component {
  render() {
    return (
      <li folderName={this.props.folderName} 
          folderPath={this.props.folderPath}>
        <div className="task">
          <h3 className="taskName">
            {this.props.name}
          </h3>
          <p> <i> {this.props.description} </i> </p>
        </div>
      </li>
    );
  }
}