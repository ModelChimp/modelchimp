/**
 *
 * InviteRedirect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectInviteRedirect from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class InviteRedirect extends React.Component {
  render() {
    return <div />;
  }
}

InviteRedirect.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  inviteRedirect: makeSelectInviteRedirect(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'inviteRedirect', reducer });
const withSaga = injectSaga({ key: 'inviteRedirect', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InviteRedirect);
