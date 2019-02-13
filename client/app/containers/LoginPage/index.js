/*
 * LoginPage
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectAuthLogged,
  makeSelectError,
} from 'containers/App/selectors';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import {
  makeSelectForgotPasswordSuccess,
  makeSelectForgotPasswordError,
} from './selectors';
import reducer from './reducer';

import { login, resetStateAction } from './actions';
import saga from './saga';
import StyledDiv from './StyledDiv';
import LoginForm from './LoginForm';

class LoginPage extends React.PureComponent {
  componentDidUpdate() {
    if (this.props.passwordSuccess) {
      message.info('Password reset mail sent succesfully!');
      this.props.resetStateAction();
    }

    if (this.props.passwordError) {
      message.error('Password reset mail could not be sent!');
      this.props.resetStateAction();
    }
  }

  render() {
    if (this.props.logged) return <Redirect to="/projects" />;

    return (
      <StyledDiv>
        <Helmet>
          <title>Login Page</title>
          <meta name="login" content="Login into Modelchimp" />
        </Helmet>
        <LoginForm
          onSubmitForm={this.props.onSubmitForm}
          errorMsg={this.props.errorMsg}
        />
      </StyledDiv>
    );
  }
}

LoginPage.propTypes = {
  logged: PropTypes.bool,
  passwordSuccess: PropTypes.bool,
  passwordError: PropTypes.func,
  resetStateAction: PropTypes.func,
  onSubmitForm: PropTypes.func,
  errorMsg: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (userName, password) => dispatch(login(userName, password)),
    resetStateAction: () => dispatch(resetStateAction()),
  };
}

const mapStateToProps = createStructuredSelector({
  logged: makeSelectAuthLogged(),
  errorMsg: makeSelectError(),
  passwordSuccess: makeSelectForgotPasswordSuccess(),
  passwordError: makeSelectForgotPasswordError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'login', saga });
const withReducer = injectReducer({ key: 'login', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(LoginPage);
