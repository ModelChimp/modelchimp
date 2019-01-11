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
import { makeSelectParamColsList } from './selectors';

class ChartMenu extends React.PureComponent {

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    let defaultKeys = [];
    const paramCols = this.props.paramCols;

    if(paramCols && paramCols.length > 0){
      defaultKeys = paramCols.splice(0, 2);
    }

    // Render the content into a list item
    return <Select
        mode="multiple"
        style={{ width: '30vw' }}
        placeholder="Please select"
        defaultValue={defaultKeys}
        onChange={this.handleChange}>
      {this.parseData(this.props.paramCols)}
      </Select>;
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
    paramCols: PropTypes.array
};

export default connect(
  createStructuredSelector({
    paramCols: makeSelectParamColsList(),
  }),
)(ChartMenu);
