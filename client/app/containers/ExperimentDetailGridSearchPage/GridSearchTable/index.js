/**
 *
 * GridSearchTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectGridSearchTable from './selectors';
import reducer from './reducer';
import {
  makeSelectExperimentGridSearchData,
  makeSelectExperimentGridSearchColumns,
 } from '../selectors';
import { Table } from 'antd';

/* eslint-disable react/prefer-stateless-function */
export class GridSearchTable extends React.Component {

  render() {

    return  <Table
              columns={this.props.columns}
              dataSource={this.parseData(this.props.dataSource, this.props.filter)}
              rowKey={this.props.rowKey}
              scroll={{ x: true }}
                />;
  }

  parseData = (d,f) => {
    if(!f) return d;

    let filterKeys = Object.keys(f);
    let result = [];


    // Iterate through rows
    for(var i=0; i < d.length; i+=1){
      let rowFlag = true;
      let row = d[i];


      // Iterate through filters
      for(var j=0; j < filterKeys.length; j+=1){
        let filterKey = filterKeys[j];
        let filterType = f[filterKey].type;
        let filterValues = f[filterKey].values;
        let rowValue = row[filterKey];
        let rFlag = true;

        // Check the filer is present in the row
        if( filterKey in row){
          // Check the filter type and accordingly check the filter condition
          if( filterType === 'categorical'){
            rFlag = filterValues.includes(rowValue) ? true : false;
          } else {
            rFlag = filterValues
                        .map(e => rowValue >= e[0] && rowValue <= e[1])
                        .reduce((a,e) => a || e);
          }
        }

        rowFlag = rowFlag && rFlag;
      }

      if(rowFlag) result.push(row);
    }

    return result;
  }
}

GridSearchTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filter: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  filter: makeSelectGridSearchTable(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'gridSearchTable', reducer });

export default compose(
  withReducer,
  withConnect,
)(GridSearchTable);
