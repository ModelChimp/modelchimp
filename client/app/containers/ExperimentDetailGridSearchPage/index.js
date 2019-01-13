/**
 *
 * ExperimentDetailGridSearchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import styled from 'styled-components';
import Plot from 'react-plotly.js';
import { isEqual } from 'lodash';
import {
  makeSelectExperimentGridSearchData,
  makeSelectExperimentGridSearchColumns,
  makeSelectParamColsSelected,
  makeSelectMetricColsSelected,
  makeSelectFiltersSelected,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  loadExperimentGridSearchAction,
  setParamColsAction,
  setFilterAction,
} from './actions';
import { parseChartData, parseFilterData } from './parseChartData';
import ChartMenu from './ChartMenu';
import GridSearchTable from './GridSearchTable';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailGridSearchPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.props.getExperimentGridSearchData(this.modelId);
  }

  onFilterSelection = d => {
    if (d.data.length === 0) return null;
    const selectedFilters = parseFilterData(d);

    if (!isEqual(this.props.filter, selectedFilters)) {
      this.props.setFilter(selectedFilters);
    }

    return null;
  };

  render() {
    return (
      <ExperimentDetail
        modelId={this.props.match.params.modelId}
        selectedKeys="6"
      >
        <Section name="GridSearch">
          <ChartMenu />
          <Plot
            data={parseChartData(
              this.props.gridsearchData,
              this.props.selectedParamCols,
              this.props.selectedMetricCols,
            )}
            layout={{ title: 'Grid Search Plot' }}
            config={{ displayModeBar: false }}
            style={{ width: 'inherit' }}
            onUpdate={this.onFilterSelection}
          />
          <Wrapper>
            <GridSearchTable
              columns={this.props.gridsearchColumns}
              dataSource={this.props.gridsearchData}
              rowKey="id"
              scroll={{ x: true }}
            />
          </Wrapper>
        </Section>
      </ExperimentDetail>
    );
  }
}

const Wrapper = styled.div`
  .ant-table {
    white-space: nowrap;
  }
`;

ExperimentDetailGridSearchPage.propTypes = {
  getExperimentGridSearchData: PropTypes.func.isRequired,
  gridsearchData: PropTypes.array,
  gridsearchColumns: PropTypes.array,
  match: PropTypes.object,
  selectedParamCols: PropTypes.array,
  selectedMetricCols: PropTypes.string,
  filter: PropTypes.array,
  setFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  gridsearchData: makeSelectExperimentGridSearchData(),
  gridsearchColumns: makeSelectExperimentGridSearchColumns(),
  selectedParamCols: makeSelectParamColsSelected(),
  selectedMetricCols: makeSelectMetricColsSelected(),
  filter: makeSelectFiltersSelected(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentGridSearchData: modelId =>
      dispatch(loadExperimentGridSearchAction(modelId)),
    setParamCols: paramCols => dispatch(setParamColsAction(paramCols)),
    setFilter: filter => dispatch(setFilterAction(filter)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'experimentDetailGridSearchPage',
  reducer,
});

const withSaga = injectSaga({ key: 'experimentDetailGridSearchPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailGridSearchPage);
