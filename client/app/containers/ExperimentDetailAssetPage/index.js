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
import { Table, Input } from 'antd';
import makeSelectExperimentDetailAssetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentAssetAction } from './actions';
import filesize from 'filesize';


/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailAssetPage extends React.Component {
  state = {
    searchText:'',
    columns:[],
  }

  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [
      {
        title: 'File Name',
        dataIndex: 'file_name',
        key: 'file_name',
        width: '20vw',
      },
      {
        title: 'Size',
        dataIndex: 'file_size',
        key: 'file_size',
        width: '60vw',
        render: (text, record) => {return filesize(text)}
      },
    ];

    this.setState({
      columns: this.columns
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

    let columnKeyList = this.state.columns.map(e=>e.key);

    return data.filter( o => {
      for(let k in o){
        if(columnKeyList.indexOf(k) > -1 ){
          if(o[k].toString().includes(searchValue)) return true;
        }
      }

      return false;
    });

  }

  render() {
    ;
//    console.log(this.state);
    return (
      <Section name="Assets">
        <Input placeholder="Basic usage"
                onChange={this.onSearch}
                style={{width:'30vw', margin:'10px'}}/>
        <Table columns={this.columns}
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
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentAssetData: modelId =>
      dispatch(loadExperimentAssetAction(modelId)),
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
