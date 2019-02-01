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
import {
  makeSelectExistingUser,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { inviteCheckAction } from './actions';
import { Redirect } from 'react-router-dom';
import ModelchimpClient from 'utils/modelchimpClient';
import { logout } from 'containers/Logout/actions';

/* eslint-disable react/prefer-stateless-function */
export class InviteRedirect extends React.Component {
  componentDidMount(){
    const inviteToken = this.props.match.params.token;

    this.props.setLogout();
    this.props.dispatch(inviteCheckAction(inviteToken));
  }


  render() {
    if(this.props.error) return
      <div>
        The invite link is not valid
      </div>;

      switch(this.props.existingUser) {
         case true: {
            return <Redirect to="/login" />;
            break;
         }
         case false: {
            return <Redirect to={`/register/${this.props.match.params.token}`} />;
            break;
         }
         default: {
            return <div>Checking the invite link</div>
            break;
         }
       }
     }
}

InviteRedirect.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  existingUser: makeSelectExistingUser(),
  error:makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setLogout: () => {
      ModelchimpClient.logout();
      return dispatch(logout());
    },
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
