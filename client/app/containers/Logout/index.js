/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuthLogged } from 'containers/App/selectors';

import { Redirect } from 'react-router-dom';
import { logout } from './actions';
import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';

class Logout extends React.PureComponent {
  render() {
    this.props.setLogout();


    return <Redirect to="/login" />;
  }
}

Logout.propTypes = {
  setLogout: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    setLogout: () => {
      ModelchimpClient.logout();
      return dispatch(logout());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  logged: makeSelectAuthLogged(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Logout);
