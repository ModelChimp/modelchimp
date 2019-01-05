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
import { makeSelectExperimentDetailMetricChartPage,
          makeSelectExperimentDetailDurationChartPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {loadExperimentChartAction} from './actions';

import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import { Table, Divider, Tag } from 'antd';
import LineChart from 'components/LineChart';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailChartPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.props.getExperimentChartData(this.modelId);

    this.timer = setInterval(()=>{
      this.props.getExperimentChartData(this.modelId);
    },2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const mData = this.props.metricData;
    const dData = this.props.durationData;

    return <ExperimentDetail modelId={this.props.match.params.modelId} selectedKeys={'4'}>
              <Section name="Metric Chart">
                { mData && mData.metric_list.map((e, i) => this.createMetricChart(e, i))}
              </Section>
              <Section name="Duration Chart">
                { dData && dData.tag_list.map((e, i) => this.createDurationChart(e, i))}
              </Section>
           </ExperimentDetail>;
  }

  createMetricChart(metric, index) {
    const data = this.props.metricData.evaluation[metric].map((e)=>({
      x: e.epoch,
      y: e.value
    }));

    return <div key={index}  style={{marginBottom:20}}>
            <LineChart data={data} label={metric} xAxisLabel={'Epoch'} />
          </div>;
  }

  createDurationChart(duration, index) {
    const data = this.props.durationData.duration[duration].map((e)=>({
      x: e.epoch,
      y: e.value
    }));

    return <div key={index}  style={{marginBottom:20}}>
            <LineChart data={data} label={`${duration} (seconds)`} xAxisLabel={'Epoch'} />
          </div>;
  }
}

ExperimentDetailChartPage.propTypes = {
  getExperimentChartData: PropTypes.func.isRequired,
  metricData: PropTypes.object,
  durationData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  metricData: makeSelectExperimentDetailMetricChartPage(),
  durationData: makeSelectExperimentDetailDurationChartPage(),

});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentChartData: modelId =>
      dispatch(loadExperimentChartAction(modelId)),
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
