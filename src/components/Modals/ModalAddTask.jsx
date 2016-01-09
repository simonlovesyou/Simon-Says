'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
const AbstractModal = require('./AbstractModal.js').default;
const AddTaskForm = require('./ModalAddTask.form.js').default;
import forms from 'newforms';
import db from '../../db';
import $ from 'jquery';

export default class ModalAddTask extends Component {
  
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  //This doesn't work for some reason, leave it until we find a way to fix it
  /*static state = {
    errorMessage: ""
  }*/

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      ruleCount: 0,
      rules: []
    }

    this.handleAddRule = this.handleAddRule.bind(this);
    this.onRuleDelete = this.onRuleDelete.bind(this);

    this._bind(['handleSubmit']);
  } 

  handleSubmit(e) {
    e.preventDefault();
    console.log("Target:");
    console.log(e.target);
    console.log("form:");
    let form = this.refs.addTaskForm.getForm();
    console.log(form);

    if(form.isValid()) {
      //this.onAddTask(form.cleanedData);
    } 
  }

  handleAddRule() {
    let increment = this.state.ruleCount;
    increment++;
    let rules = this.state.rules;
      
    let key = (rules.length === 0) ? 0 : (parseInt(rules[rules.length-1].key, 10)+1);

    rules.push( <li key={key} 
                    accessKey={key}>
                 <button type="button"
                          role="button" 
                          className="pull-left btn btn-danger"
                          onClick={this.onRuleDelete}> - </button>
                   <select form="addTaskForm">
                    <option value="name"> Filename </option>
                    <option value="extension"> Extension </option>
                  </select>
                  <select form="addTaskForm">
                    <option value="equals"> Equals </option>
                    <option value="contains"> Contains </option>
                    <option value="doesNotEquals"> Does not equals </option>
                    <option value="doesNotContain"> Does not contain </option>
                  </select>
                  <input type="text" placeholder="Match" /> 
                </li>);

    this.setState({rules, 
                  ruleCount: increment});
  }

  onAddFolder(form) {
    let dir = path.dirname(form.directory);
    let base = path.basename(form.directory);

    db('folders')
    .push({
      folder: {
        name: base, 
        path: dir
      }
    });
  }

  onRuleDelete(e) {

    let filterKey = parseInt(e.target.parentNode.accessKey, 10);
    let rules = this.state.rules;

    rules = rules.filter(li => (li.props.accessKey !== filterKey));

    this.setState({rules})
  }

  render() {

    const body = (
      <form id="addTaskForm" 
            action="" 
            className="row"
            onSubmit={this.handleSubmit}>
        <forms.RenderForm form={AddTaskForm} 
                          ref="addTaskForm"/>
        <button type="button"
                id="addRule" 
                className="btn btn-default" 
                onClick={this.handleAddRule}> + </button>
        <ul>
          {this.state.rules}
        </ul>
        <span> <p className="error"> {this.state.errorMessage} </p> </span>
      </form>
      );
    const footer = (
      <div>
        <button className="btn btn-default" 
                type="button" 
                data-dismiss="modal"> Close </button>
        <button id="taskSave"
                className="btn btn-primary" 
                form="addTaskForm"
                type="submit"> Add Task </button>
      </div>
      )
    return (
      <AbstractModal header="Add Task" 
                     modalBody={body} 
                     modalFooter={footer}/>
      )
  }
}


$('#addTaskButton').click(() => {
  ReactDOM.render(
    <ModalAddTask />,
    document.getElementById('modal')
  );
})

