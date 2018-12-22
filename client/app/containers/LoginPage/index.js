/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectAuthLogged,
  makeSelectError,
} from 'containers/App/selectors';

import H1 from 'components/H1';

import { Redirect } from 'react-router-dom';
import { login } from './actions';
import saga from './saga';
import StyledDiv from './StyledDiv';
import LoginForm from './LoginForm';

class LoginPage extends React.PureComponent {
  render() {
    if (this.props.logged) return <Redirect to="/projects" />;

    return (
      <StyledDiv>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>Login Page</H1>
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
  onSubmitForm: PropTypes.func,
  errorMsg: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (userName, password) => dispatch(login(userName, password)),
  };
}

const mapStateToProps = createStructuredSelector({
  logged: makeSelectAuthLogged(),
  errorMsg: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);
