/**
 *
 * ExperimentDetail
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
import makeSelectExperimentDetail from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetail extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ExperimentDetail</title>
          <meta name="description" content="Description of ExperimentDetail" />
        </Helmet>
      </div>
    );
  }
}

ExperimentDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  experimentDetail: makeSelectExperimentDetail(),
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

const withReducer = injectReducer({ key: 'experimentDetail', reducer });
const withSaga = injectSaga({ key: 'experimentDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetail);
