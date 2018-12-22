import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <A href="/Projects">
          <Img
            src="https://docs.modelchimp.com/logo.png"
            alt="react-boilerplate - Logo"
          />
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
          <HeaderLink to="/logout">
            <FormattedMessage {...messages.logout} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
