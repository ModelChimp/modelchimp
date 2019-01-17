/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProjectSetting from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ProjectSetting extends React.Component {
  render() {
    return <div>Setting Page</div>;
  }
}

ProjectSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectSetting: makeSelectProjectSetting(),
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

const withReducer = injectReducer({ key: 'projectSetting', reducer });
const withSaga = injectSaga({ key: 'projectSetting', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectSetting);
