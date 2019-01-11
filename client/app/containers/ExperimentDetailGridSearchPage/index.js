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
import {
  makeSelectExperimentGridSearchData,
  makeSelectExperimentGridSearchColumns,
  makeSelectParamColsSelected,
  makeSelectMetricColsSelected
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {loadExperimentGridSearchAction} from './actions';
import parseChartData from './parseChartData';
import ChartMenu from './ChartMenu';
import {parseFilterData} from './parseChartData';

import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import { Table, Divider, Tag } from 'antd';
import styled from 'styled-components';
import Plot from 'react-plotly.js';


/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailGridSearchPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.props.getExperimentGridSearchData(this.modelId);
  }

  render() {
    return <ExperimentDetail modelId={this.props.match.params.modelId} selectedKeys={'6'}>
      <Section name="GridSearch">
        <ChartMenu />

        <Plot
        data={[parseChartData(this.props.gridsearchData,
                              this.props.selectedParamCols,
                              this.props.selectedMetricCols )]}
        layout={ { title: 'Grid Search Plot'}}
        config={{displayModeBar: false}}
        style={{width:'inherit'}}
        onUpdate={ parseFilterData }

      />
        <Wrapper>
          <Table columns={this.props.gridsearchColumns}
                  dataSource={this.props.gridsearchData}
                  rowKey="id"
                  scroll={{x:true}}
                   />
        </Wrapper>
      </Section>
    </ExperimentDetail>;
  }
}

const Wrapper = styled.div`
.ant-table { white-space: nowrap; }
`;

ExperimentDetailGridSearchPage.propTypes = {
  getExperimentGridSearchData: PropTypes.func.isRequired,
  gridsearchData: PropTypes.array,
  gridsearchColumns: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  gridsearchData: makeSelectExperimentGridSearchData(),
  gridsearchColumns: makeSelectExperimentGridSearchColumns(),
  selectedParamCols: makeSelectParamColsSelected(),
  selectedMetricCols: makeSelectMetricColsSelected()
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentGridSearchData: modelId =>
      dispatch(loadExperimentGridSearchAction(modelId)),
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
