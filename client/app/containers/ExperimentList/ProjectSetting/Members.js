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
import {makeSelectUpdateFlag, makeSelectDeleteFlag} from './selectors';
import Section from 'components/Section';
import { Button, Modal, message } from 'antd';
import { makeSelectProjectDetail } from 'containers/ProjectDetail/selectors';



/* eslint-disable react/prefer-stateless-function */
export class Members extends React.Component {

  render() {
    return <div> Members </div>;
  }
}

Members.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // updateFlag: makeSelectUpdateFlag(),
  // deleteFlag: makeSelectDeleteFlag(),
  projectDetail: makeSelectProjectDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
