/**
 *
 * ExperimentDetailMetricPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectExperimentDetailMetricPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {loadExperimentMetricAction} from './actions';

import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import { Table, Divider, Tag } from 'antd';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailMetricPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [{
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    }, {
      title: 'Max',
      dataIndex: 'max',
      key: 'max',
    }, {
      title: 'Min',
      dataIndex: 'min',
    },];

    this.props.getExperimentMetricData(this.modelId);
  }

  render() {
    return <ExperimentDetail modelId={this.modelId} selectedKeys={'1'}>
      <Section name="Metrics">
        <Table columns={this.columns} dataSource={this.props.metricData} />
      </Section>
    </ExperimentDetail>;
  }
}

ExperimentDetailMetricPage.propTypes = {
  getExperimentMetricData: PropTypes.func.isRequired,
  metricData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  metricData: makeSelectExperimentDetailMetricPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentMetricData: modelId =>
      dispatch(loadExperimentMetricAction(modelId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'experimentDetailMetricPage',
  reducer,
});
const withSaga = injectSaga({ key: 'experimentDetailMetricPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailMetricPage);
