import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';


class PublicPage extends PureComponent {
  render() {
    return (
      <div>
        Public Page.
        <br />
        <br />
        <Link to="/auth">Sign up</Link>
      </div>
    );
  }
}

export default PublicPage;
