import React, { Component } from 'react';


class Form extends Component {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }


  onClick(e) {
    e.preventDefault();

    this.props.sendMessage(this._text.value);
  }


  render() {
    return (
      <form className="pm-form">
        <textarea
          ref={text => { this._text = text; }}
          className="pm-form__input"
        />
        <div className="pm-panel">
          <input
            className="pm-form__send"
            type="submit"
            onClick={this._onClick}
            value="Send"
          />
        </div>
      </form>
    );
  }
}


export default Form;
