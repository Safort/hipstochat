import './index.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../../actions/modalActions';
import Profile from './profile';


const modalComponents = {
  profile: Profile,
};


class Modal extends Component {
  constructor() {
    super();

    this._hide = this.hide.bind(this);
  }


  hide(event) {
    if (this.refs.bg === event.target) {
      this.props.modalActions.hide();
    }
  }


  render() {
    const { state, modalName, modalData } = this.props;
    const CurrentModal = modalComponents[modalName];
    let classes = `modal modal_${state}`;

    if (!CurrentModal) {
      return <span />;
    }

    return (
      <div ref="bg" className={classes} onClick={this._hide}>
        <div className="modal__content">
          <CurrentModal user={modalData} />
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
  };
}


function mapStateToProps(state) {
  return {
    modal: state.modal,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal);
