/**
 *
 * ExperimentDetailChartPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section';
import LineChart from 'components/LineChart';
import {
  makeSelectExperimentDetailMetricChartPage,
  makeSelectExperimentDetailDurationChartPage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentChartAction } from './actions';

import { EXPERIMENT_TAB_CHARTS } from '../ExperimentDetail/constants';
import { onExperimentTabSelect } from '../ExperimentDetail/actions';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailChartPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.props.getExperimentChartData(this.modelId);
    this.props.onExperimentTabSelect(EXPERIMENT_TAB_CHARTS);

    this.timer = setInterval(() => {
      this.props.getExperimentChartData(this.modelId);
    }, 2000);


  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const mData = this.props.metricData;
    const dData = this.props.durationData;

    return (
      <div>
        <Section name="Metric Chart"
          description="Visualize metrics captured at epoch level"
          >
          {mData &&
            mData.metric_list.map((e, i) => this.createMetricChart(e, i))}
        </Section>
        <Section name="Duration Chart"
          description="Visualize durations captured at epoch level"
          >
          {dData &&
            dData.tag_list.map((e, i) => this.createDurationChart(e, i))}
        </Section>
      </div>
    );
  }

  createMetricChart(metric, index) {
    const data = this.props.metricData.evaluation[metric].map(e => ({
      x: e.epoch,
      y: e.value,
    }));

    return (
      <div key={index} style={{ marginBottom: 20 }}>
        <LineChart data={data} label={metric} xAxisLabel="Epoch" />
      </div>
    );
  }

  createDurationChart(duration, index) {
    const data = this.props.durationData.duration[duration].map(e => ({
      x: e.epoch,
      y: e.value,
    }));

    return (
      <div key={index} style={{ marginBottom: 20 }}>
        <LineChart
          data={data}
          label={`${duration} (seconds)`}
          xAxisLabel="Epoch"
        />
      </div>
    );
  }
}

ExperimentDetailChartPage.propTypes = {
  getExperimentChartData: PropTypes.func.isRequired,
  metricData: PropTypes.object,
  durationData: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  metricData: makeSelectExperimentDetailMetricChartPage(),
  durationData: makeSelectExperimentDetailDurationChartPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentChartData: modelId =>
      dispatch(loadExperimentChartAction(modelId)),
    onExperimentTabSelect: tabKey =>
      dispatch(onExperimentTabSelect(tabKey)),
    onExperimentTabSelect: tabKey =>
      dispatch(onExperimentTabSelect(tabKey)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'experimentDetailChartPage',
  reducer,
});
const withSaga = injectSaga({ key: 'experimentDetailChartPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailChartPage);
