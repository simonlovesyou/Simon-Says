'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
const AbstractModal = require('./AbstractModal.js').default;
const AddFolderForm = require('./ModalAddFolder.form').default;
import forms from 'newforms';
import db from '../../db';

export default class ModalAddFolder extends Component {
  
  _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }

  //This doesn't work for some reason, leave it until we find a way to fix it
  /*static state = {
    errorMessage: "Inget error :)"
  }*/

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    }
    this._bind(['handleSubmit']);
  } 

  handleSubmit(e) {
    e.preventDefault();

    console.log(e.target);

    let form = this.refs.addFolderForm.getForm();
    if(form.isValid()) {
      this.onAddFolder(form.cleanedData);
    } 
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

  render() {
    const body = (
      <form id="addFolderForm" 
            action="" 
            className="row"
            onSubmit={this.handleSubmit}>
        <forms.RenderForm form={AddFolderForm} 
                          ref="addTaskForm"
                          NoValidate/>
        <span> <p className="error"> {this.state.errorMessage} </p> </span>
      </form>
      );
    const footer = (
      <div>
        <button className="btn btn-default" 
                type="button" 
                data-dismiss="modal"> Close </button>
        <button id="folderSave"
                className="btn btn-primary" 
                form="addFolderForm"
                type="submit"> Save Changes </button>
      </div>
      )
    return (
      <AbstractModal header="Add Folder" 
                     modalBody={body} 
                     modalFooter={footer}/>
      )
  }
}

$('#addFolderButton').click(() => {
  ReactDOM.render(
    <ModalAddFolder />,
    document.getElementById('modal')
  );
})


