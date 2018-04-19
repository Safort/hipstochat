import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../../actions/modal';
import * as dialogActions from '../../actions/dialog';
import Profile from './Profile';
import styles from './index.css';


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
    const { modalName, modalData, dialogActions } = this.props;
    const CurrentModal = modalComponents[modalName];

    if (!CurrentModal) {
      return <span />;
    }

    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div ref={el => { this._bg = el; }} className={styles.modal} onClick={this._hide}>
        <div className={styles.modalContent}>
          <CurrentModal user={modalData} dialogActions={dialogActions} />
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch),
  };
}


function mapStateToProps({ modal }) {
  return { modal };
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal);