import React, { Component } from 'react';
import { browserHistory } from 'react-router'

export default class Search extends Component {
  constructor() {
    super();

    this._onSearch = this.onSearch.bind(this);
  }

  onSearch(event) {
    if (event.keyCode === 13) {
      browserHistory.push('/search');
    }
  }

  render() {
    return (
      <div className="menu-search">
        <input
          className="menu-search__input" 
          placeholder="username"
          onKeyUp={this._onSearch}
        />
      </div>
    );
  }
}
