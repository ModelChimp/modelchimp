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
import {Line} from 'react-chartjs-2';

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
        <Line data={this.parseData(this.props.chartData)} options={{
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }}
    height={50}
    />
      </Section>
    </ExperimentDetail>;
  }

  parseData(data) {
    const result = {
      datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data
          }
        ]
      };

      return result;
  }
}

ExperimentDetailChartPage.propTypes = {
  getExperimentChartData: PropTypes.func.isRequired,
  chartData: PropTypes.array
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
