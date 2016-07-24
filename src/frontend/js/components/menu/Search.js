import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <div className="menu-search">
        <input className="menu-search__input" defaultValue="text" />
      </div>
    );
  }
};
