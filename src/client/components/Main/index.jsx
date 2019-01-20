import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PageLoader from '../PageLoader';
import Modal from '../Modal';
import PublicPage from './PublicPage';
import * as userActions from '../../actions/user';
import * as modalActions from '../../actions/modal';
import * as styles from './index.css';

class Main extends Component {
  componentDidMount() {
    this.props.userActions.loadInfo();
  }

  renderPage() {
    if (this.props.user.login) {
      return <div className={styles.greeting}>Welcome home, Master!</div>;
    } else {
      return <PublicPage />;
    }
  }

  render() {
    const { user, modal } = this.props;

    return (
      <div className={styles.main}>
        {user.isFetching ? <PageLoader /> : this.renderPage()}

        <Modal {...modal} />
      </div>
    );
  }
}

function mapStateToProps({ user, modal }) {
  return { user, modal };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
