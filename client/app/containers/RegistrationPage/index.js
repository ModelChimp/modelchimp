/**
 *
 * RegistrationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectRegistrationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import RegisterForm from './RegisterForm';
import Content from 'components/Content';
import StyledDiv from './StyledDiv';

/* eslint-disable react/prefer-stateless-function */
export class RegistrationPage extends React.Component {
  render() {
    return (
      <StyledDiv>
        <Helmet>
          <title>RegistrationPage</title>
          <meta name="description" content="Description of Registration Page" />
        </Helmet>
        <RegisterForm />
      </StyledDiv>
    );
  }
}

RegistrationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registrationPage: makeSelectRegistrationPage(),
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

const withReducer = injectReducer({ key: 'registrationPage', reducer });
const withSaga = injectSaga({ key: 'registrationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegistrationPage);
