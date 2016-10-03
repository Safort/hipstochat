import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import * as dialogsActions from '../../actions/dialogsActions';
import Profile from './profile';

import './index.css';


const modalComponents = {
  profile: Profile,
};


class Modal extends Component {
  constructor() {
    super();

    this._hide = this.hide.bind(this);
  }


  hide(event) {
    if (this._bg === event.target) {
      this.props.modalActions.hide();
    }
  }


  render() {
    const { state, modalName, modalData, dialogsActions } = this.props;
    const CurrentModal = modalComponents[modalName];
    const classes = `modal modal_${state}`;

    if (!CurrentModal) {
      return <span />;
    }

    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div ref={el => { this._bg = el; }} className={classes} onClick={this._hide}>
        <div className="modal__content">
          <CurrentModal user={modalData} dialogsActions={dialogsActions} />
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    dialogsActions: bindActionCreators(dialogsActions, dispatch),
  };
}


function mapStateToProps({ modal }) {
  return { modal };
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal);
