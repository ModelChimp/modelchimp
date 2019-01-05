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
import makeSelectExperimentDetailChartPage from './selectors';
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
  }

  render() {
    const data = this.props.cData;

    return <ExperimentDetail modelId={this.props.match.params.modelId} selectedKeys={'4'}>
              <Section name="Charts">
                { data && data.metric_list.map((e, i) => this.createChart(e, i))}
              </Section>
           </ExperimentDetail>;
  }

  createChart(metric, index) {
    const data = this.props.cData.evaluation[metric].map((e)=>({
      x: e.epoch,
      y: e.value
    }));

    return <div style={{marginBottom:20}}>
            <LineChart key={index} data={data} label={metric} xAxisLabel={'Epoch'} />
          </div>;
  }
}

ExperimentDetailChartPage.propTypes = {
  getExperimentChartData: PropTypes.func.isRequired,
  cData: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  cData: makeSelectExperimentDetailChartPage(),
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
