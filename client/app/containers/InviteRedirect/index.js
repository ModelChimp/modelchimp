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
import {makeSelectExistingUser} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { inviteCheckAction } from './actions';


/* eslint-disable react/prefer-stateless-function */
export class InviteRedirect extends React.Component {
  componentDidMount(){
    const inviteToken = this.props.match.params.token;

    this.props.dispatch(inviteCheckAction(inviteToken));
  }


  render() {
    console.log(this.props.existingUser);
    return <div>
      hello
    </div>;
  }
}

InviteRedirect.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  existingUser: makeSelectExistingUser(),
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
