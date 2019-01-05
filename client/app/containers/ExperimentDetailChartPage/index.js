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

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailChartPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [{
      title: 'Chart',
      dataIndex: 'chart',
      key: 'chart',
    }, {
      title: 'Max',
      dataIndex: 'max',
      key: 'max',
    }, {
      title: 'Min',
      dataIndex: 'min',
    },];

    this.props.getExperimentChartData(this.modelId);
  }

  render() {
    console.log(this.props.chartData);
    return <ExperimentDetail modelId={this.props.match.params.modelId} selectedKeys={'4'}>
      <Section name="Charts">
        Hello
      </Section>
    </ExperimentDetail>;
  }
}

ExperimentDetailChartPage.propTypes = {
  getExperimentChartData: PropTypes.func.isRequired,
  chartData: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  chartData: makeSelectExperimentDetailChartPage(),
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
