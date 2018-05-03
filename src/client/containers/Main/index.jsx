import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import PageLoader from '../../components/PageLoader';
import Modal from '../../components/Modal';
import * as userActions from '../../actions/user';
import * as modalActions from '../../actions/modal';
import * as styles from './index.css';


class Main extends Component {
  componentDidMount() {
    this.props.userActions.loadInfo();
  }

  render() {
    const { user, modal, match } = this.props;
    const routeRender = () => (
      user.username ? (
        <div className={styles.greeting}>Welcome home, Master!</div>
      ) : (
        <Redirect to={`${match.url}auth`} />
      )
    );

    return (
      <div className={styles.main}>
        {user.isInfoLoaded ? (
            <Route path={`${match.url}`} render={routeRender} />
          ) : (
            <PageLoader />
          )
        }

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


export default connect(mapStateToProps, mapDispatchToProps)(Main);
