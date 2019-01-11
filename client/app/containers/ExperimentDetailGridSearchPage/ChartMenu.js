/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Select } from 'antd';
import {
  makeSelectParamColsList,
  makeSelectMetricColsList,
  makeSelectParamColsSelected,
  makeSelectMetricColsSelected
 } from './selectors';
import {
  setParamColsAction,
  setMetricColsAction
} from './actions';

import styled from 'styled-components';


const Wrapper = styled.div`
  margin:10px;
`;

class ChartMenu extends React.PureComponent {
  constructor (props){
    super(props);
    this.handleParamChange = this.handleParamChange.bind(this);
    this.handleMetricChange = this.handleMetricChange.bind(this);
  }

  handleParamChange(value) {
    this.props.setParams(value);
  }

  handleMetricChange(value) {
    this.props.setMetrics(value);
  }

  render() {
    // Render the content into a list item
    return (
      <Wrapper>
        <Select
            mode="multiple"
            style={{ width: '30vw' }}
            placeholder="Please select"
            defaultValue={this.props.selectedParamCols}
            onChange={this.handleParamChange}>
          {this.parseData(this.props.paramCols)}
          </Select>
          <Select
              showSearch
              style={{ width: 200, float:'right' }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.handleMetricChange}
              defaultValue={this.props.selectedMetricCols}
            >
            {this.parseData(this.props.metricCols)}
            </Select>
      </Wrapper>
    );
  }

  parseData(data){
    let result = [];

    if(!data) return;
    for(var i in data){
      result.push(
        <Select.Option key={data[i]}>{data[i]}</Select.Option>
      )
    }

    return result;
  }
}

ChartMenu.propTypes = {
    paramCols: PropTypes.array,
    setParams: PropTypes.func
};


function mapDispatchToProps(dispatch) {
  return {
    setParams: (paramCols) =>
      dispatch(setParamColsAction(paramCols)),
    setMetrics: (metricCols) =>
      dispatch(setMetricColsAction(metricCols)),
  };
}


export default connect(
  createStructuredSelector({
    paramCols: makeSelectParamColsList(),
    metricCols: makeSelectMetricColsList(),
    selectedParamCols: makeSelectParamColsSelected(),
    selectedMetricCols: makeSelectMetricColsSelected()
  }),
  mapDispatchToProps
)(ChartMenu);
