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
import Section from 'components/Section';
import styled from 'styled-components';
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

import loadable from 'loadable-components';
import LoadingIndicator from 'components/LoadingIndicator';

const Plot = loadable(() => import('./Plot'), {
  LoadingComponent: LoadingIndicator,
});


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

  componentWillUnmount() {
    // clearInterval(this.timer);
  }

  render() {
    const {
      gridsearchData,
      gridsearchColumns,
      selectedParamCols,
      selectedMetricCols,
    } = this.props;
    const renderHTML =
      gridsearchData && gridsearchData.length > 0 ? (
        <Section name="GridSearch">
          <ChartMenu />
          <Plot
            data={parseChartData(
              gridsearchData,
              selectedParamCols,
              selectedMetricCols,
            )}
            layout={{ title: 'Grid Search Plot' }}
            config={{ displayModeBar: false }}
            style={{ width: 'inherit' }}
            onUpdate={this.onFilterSelection}
          />
          <Wrapper>
            <GridSearchTable
              columns={gridsearchColumns}
              dataSource={gridsearchData}
              rowKey="id"
              scroll={{ x: true }}
            />
          </Wrapper>
        </Section>
      ) : (
        <Section name="GridSearch">No Data</Section>
      );

    return <div>{renderHTML}</div>;
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
