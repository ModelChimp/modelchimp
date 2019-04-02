/**
 *
 * ExperimentDetailMatPlotPage
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
import { Table } from 'antd';
import makeSelectExperimentDetailMatPlotPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentMatPlotAction } from './actions';

import { EXPERIMENT_TAB_MATPLOTS } from '../ExperimentDetail/constants';
import { onExperimentTabSelect } from '../ExperimentDetail/actions';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailMatPlotPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    // this.columns = [
    //   {
    //     title: 'MatPlot',
    //     dataIndex: 'matPlot',
    //     key: 'matPlot',
    //   },
    //   {
    //     title: 'Max',
    //     dataIndex: 'max',
    //     key: 'max',
    //   },
    //   {
    //     title: 'Min',
    //     dataIndex: 'min',
    //   },
    // ];

    this.props.onExperimentTabSelect(EXPERIMENT_TAB_MATPLOTS);
    // this.props.getExperimentMatPlotData(this.modelId);
  }

  render() {
    return (
      <Section name="MatPlots">
        Hello
      </Section>
    );
  }
}

ExperimentDetailMatPlotPage.propTypes = {
  getExperimentMatPlotData: PropTypes.func.isRequired,
  matPlotData: PropTypes.array,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  matPlotData: makeSelectExperimentDetailMatPlotPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentMatPlotData: modelId =>
      dispatch(loadExperimentMatPlotAction(modelId)),
    onExperimentTabSelect: tabKey =>
      dispatch(onExperimentTabSelect(tabKey)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'ExperimentDetailMatPlotPage',
  reducer,
});
const withSaga = injectSaga({ key: 'ExperimentDetailMatPlotPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailMatPlotPage);
