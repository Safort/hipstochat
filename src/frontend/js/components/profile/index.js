import React, { Component } from 'react';
import Menu from '../menu';

export default class Profile extends Component {
    saveData() {
        const userName = this.refs.userName.value;
    }

    render() {
        return (
            <div className='profile-edit'>
                <div className='profile'>
                    <input ref='userName' onEnter={this.saveData.bind(this)} />
                    <br />
                    <input defaultValue={'email'} />
                    <br />
                    <input defaultValue={'pass'} />
                    <br />
                    <input defaultValue={'avatarUrl'} />
                    <br />
                    <input type='button' value='Save'
                           onClick={this.saveData.bind(this)} />
                </div>
            </div>
        );
    }
}
