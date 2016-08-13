import React, { Component } from 'react';


class User extends Component {
  constructor(props) {
    super(props);

    this._onClick = this.onClick.bind(this);
  }


  onClick() {
    this.props.modalActions.show('profile', this.props.data);
  }


  render() {
    return (
      <div onClick={this._onClick} className="search__user">
        {this.props.data.username}
      </div>
    );
  }
}

export default User;
