/**
 *
 * ExperimentDetailAssetPage
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
import { Table, Input, Select } from 'antd';
import makeSelectExperimentDetailAssetPage, {makeSelectAssetField} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentAssetAction, loadExperimentAssetFieldAction } from './actions';
import filesize from 'filesize';


/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailAssetPage extends React.Component {
  state = {
    searchText:'',
    baseColumns:[],
    outputColumns:[],
  }

  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [
      {
        title: 'File Name',
        dataIndex: 'file_name',
        key: 'file_name',
      },
      {
        title: 'Size',
        dataIndex: 'file_size',
        key: 'file_size',
        render: (text, record) => {return filesize(text)}
      },
    ];

    this.setState({
      baseColumns: this.columns,
      outputColumns: this.columns
    })
    this.props.getExperimentAssetData(this.modelId);
  }

  onSearch = e => {
    console.log(e.target.value);
    this.setState({
      searchText:e.target.value
    });
  }

  filterData = (data, searchValue) => {
    if(!data) return null;

    let columnKeyList = this.state.outputColumns.map(e=>e.key);

    return data.filter( o => {
      for(let k in o){
        if(columnKeyList.indexOf(k) > -1 ){
          if(o[k].toString().includes(searchValue)) return true;
        }
      }
      return false;
    });

  }

  generateAssetFieldSelect = (d) => {
    return d.map( e => <Select.Option key={e.name}>{e.name}</Select.Option> )
  }

  handleParamChange = (d) => {
    let fieldColumns = d.map( e => ({
      title: e,
      dataIndex: `meta_dict.${e}`,
      key: `meta_dict.${e}`,
    }));

    this.setState({
      outputColumns: [...this.columns, ...fieldColumns],
    });

  }

  render() {
    return (
      <Section name="Assets">
        <Input placeholder="Search"
                onChange={this.onSearch}
                style={{width:'30vw', margin:'10px'}}/>
        <Select
          mode="multiple"
          style={{ width: '30vw', float:'right',  margin:'10px' }}
          placeholder="Please select meta columns"
          defaultValue={this.props.selectedParamCols}
          onChange={this.handleParamChange}
        >
          {this.generateAssetFieldSelect(this.props.assetFieldData)}
        </Select>
        <Table columns={this.state.outputColumns}
                dataSource={this.filterData(this.props.assetData, this.state.searchText)}
                rowKey="id"
        />
      </Section>
    );
  }
}

ExperimentDetailAssetPage.propTypes = {
  getExperimentAssetData: PropTypes.func.isRequired,
  assetData: PropTypes.array,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  assetData: makeSelectExperimentDetailAssetPage(),
  assetFieldData: makeSelectAssetField(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentAssetData: modelId =>{
      dispatch(loadExperimentAssetAction(modelId));
      dispatch(loadExperimentAssetFieldAction(modelId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'experimentDetailAssetPage',
  reducer,
});
const withSaga = injectSaga({ key: 'experimentDetailAssetPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailAssetPage);
