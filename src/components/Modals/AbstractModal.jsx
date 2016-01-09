'use strict';
import React, { Component } from 'react';

export default class AbstractModal extends Component {
  
  static propTypes = {
    header: React.PropTypes.string,
    buttonText: React.PropTypes.string,
    modalBody: React.PropTypes.object,
    modalFooter: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="modal-header">
          <button type="button" 
                  className="close" 
                  data-dismiss="modal" 
                  aria-label="Close"> 
            <span aria-hidden="true"> &times; </span>
          </button>

          <h4 className="modal-title"> 
            {this.props.header} 
          </h4>
        </div>
          
        <div className="modal-body">
          
          {this.props.modalBody}

          <div className="modal-footer">
            {this.props.modalFooter}
          </div>
          
        </div>
      </div>
    );
  }
}
