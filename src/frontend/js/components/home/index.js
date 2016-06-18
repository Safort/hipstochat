import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Router, Route, Link } from 'react-router';

import * as userActions from '../../actions/userActions';
import Signup from '../signup';

class Home extends Component {
    render() {
        const {username} = this.props.user;

        return (
            <div>
                {username ? 'Welcome home, Master!' : <Signup />}
            </div>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
