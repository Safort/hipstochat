import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Router, Route, Link } from 'react-router';

import * as userActions from '../../actions/userActions';

class Signup extends Component {
    componentWillMount() {
        this.setState({signup: 'inactive', signin: 'active'});
    }

    signupUser() {
        const refs = this.refs;
        const username = refs.username.value;
        const name = refs.name.value;
        const email = refs.email.value;
        const password = refs.password.value;
        this.props.userActions.signup({username, name, email, password});
    }

    signinUser(event) {
        event.preventDefault();

        const refs = this.refs;
        const username = refs.signinUsername.value;
        const password = refs.signinPassword.value;
        this.props.userActions.signin({username, password});
    }

    tabHandler(event) {
        if (this.state.signup == 'active') {
            this.setState({signup: 'inactive', signin: 'active'});
        } else {
            this.setState({signup: 'active', signin: 'inactive'});
        }
    }

    render() {
        const tabSignup = `home__tab home__tab--${this.state.signup}`;
        const tabSignin = `home__tab home__tab--${this.state.signin}`;

        const pageSignup = `signup home__page home__page--${this.state.signup}`;
        const pageSignin = `signin home__page home__page--${this.state.signin}`;

        return (
            <div className='home'>
                <div className='home__tabs'
                    onClick={this.tabHandler.bind(this)}
                >
                    <div className={tabSignup}>Sign up</div>
                    <div className={tabSignin}>Sign in</div>
                </div>
                <div className={pageSignup}>
                    <h3>Sign up</h3>
                    <input ref='username' placeholder='Username' />
                    <input ref='name' placeholder='Name' />
                    <input ref='email' placeholder='Email' />
                    <input ref='password' placeholder='Password' />
                    <input
                        type='button'
                        value='Sign up'
                        onClick={this.signupUser.bind(this)}
                    />
                </div>
                <form className={pageSignin}
                      action='http://localhost:8080/signin'
                      method='post'
                >
                    <h3>Sign in</h3>
                    <input ref='signinUsername' placeholder='Username' />
                    <input ref='signinPassword' placeholder='Password' />
                    <input
                        type='submit'
                        value='Sign in'
                        onClick={this.signinUser.bind(this)}
                    />
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
