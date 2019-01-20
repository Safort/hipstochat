import React, { Component } from 'react';
import styles from './index.css';

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
      <form className={styles.pmForm}>
        <textarea
          ref={text => {
            this._text = text;
          }}
          className={styles.pmFormInput}
        />
        <div className={styles.pmPanel}>
          <input className={styles.pmFormSend} type="submit" onClick={this._onClick} value="Send" />
        </div>
      </form>
    );
  }
}

export default Form;
