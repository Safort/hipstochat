import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Menu from '../Menu';
import Main from '../Main';
import Auth from '../Auth';
import Search from '../Search';
import Pm from '../PM';
import Profile from '../Profile';
import NoMatch from '../../components/NoMatch';
import Modal from '../../components/Modal';
import * as userActions from '../../actions/user';
import * as modalActions from '../../actions/modal';
import * as styles from './index.css';


class App extends React.Component {
  componentDidMount() {
    this.props.userActions.loadInfo();
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Menu />
          <div className={styles.layout}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/profile/edit" component={Profile} />
              <Route exact path="/pm/:dialogId" component={Pm} />
              <Route exact path="/search" component={Search} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Modal {...this.props.modal} />
        </div>
      </Router>
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
