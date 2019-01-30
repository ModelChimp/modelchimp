/**
 *
 * PasswordResetPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import StyledDiv from './StyledDiv';
import {
  message
} from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectPasswordResetSuccess, makeSelectPasswordResetError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { passwordResetAction, resetAction } from './actions';
import {
  makeSelectAuthLogged,
  makeSelectError,
} from 'containers/App/selectors';
import { Redirect } from 'react-router-dom';
import PasswordResetForm from './PasswordResetForm';
import ModelchimpClient from 'utils/modelchimpClient';
import { logout } from 'containers/Logout/actions';

/* eslint-disable react/prefer-stateless-function */
export class PasswordResetPage extends React.Component {
  handleSubmit = (d) =>{
    this.props.dispatch(passwordResetAction(d));
  }

  componentDidUpdate(){
    if(this.props.error){
      message.error('Password Reset unsuccessful!');
      this.props.dispatch(resetAction());
    }
  }

  componentDidMount(){
    this.props.setLogout();
  }
  render() {
    // if (this.props.logged) return <Redirect to="/projects" />;

    return (
      <StyledDiv>
        <Helmet>
          <title>Password Reset Page</title>
          <meta name="description" content="Reset of password" />
        </Helmet>
        <PasswordResetForm
          onSubmit={this.handleSubmit}
          uid={this.props.match.params.uid}
          token={this.props.match.params.token}
          />
      </StyledDiv>
    );
  }
}

PasswordResetPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  success: makeSelectPasswordResetSuccess(),
  error: makeSelectPasswordResetError(),
  logged: makeSelectAuthLogged(),
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

const withReducer = injectReducer({ key: 'passwordResetPage', reducer });
const withSaga = injectSaga({ key: 'passwordResetPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PasswordResetPage);
