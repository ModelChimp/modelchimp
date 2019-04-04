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
import { Table, Input, Select, Drawer } from 'antd';
import makeSelectExperimentDetailAssetPage, {makeSelectAssetField} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentAssetAction, loadExperimentAssetFieldAction, loadAssetBlob } from './actions';
import filesize from 'filesize';
import AssetDrawer from './AssetDrawer';
import { isTextExtension } from 'utils/filePath';

import { EXPERIMENT_TAB_ASSET } from '../ExperimentDetail/constants';
import { onExperimentTabSelect } from '../ExperimentDetail/actions';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailAssetPage extends React.Component {
  state = {
    searchText:'',
    baseColumns:[],
    outputColumns:[],
    drawerVisible: false,
    assetUrl: '',
    assetId: null,
    assetName: null,
  }

  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [
      {
        title: 'File Name',
        dataIndex: 'file_name',
        key: 'file_name',
        render: (text, record) => {
          return <a onClick={() => this.showDrawer(record.asset, record.id, record.file_name)}> {text} </a>
        },
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
    this.props.onExperimentTabSelect(EXPERIMENT_TAB_ASSET);
    this.props.getExperimentAssetData(this.modelId);
  }

  showDrawer = (assetUrl, assetId, assetName) => {
    this.setState({
      drawerVisible: true,
      assetUrl: assetUrl,
      assetId: assetId,
      assetName: assetName
    });

    if(isTextExtension(assetUrl)) this.props.getAssetBlob(this.props.match.params.modelId, assetId);
  };

  closeDrawer = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  onSearch = e => {
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
    if(!d) return null;

    return d.map( e => <Select.Option key={e.name}>{e.name}</Select.Option> )
  }

  handleParamChange = (d) => {
    if(!d) return null;


    let fieldColumns = d.map( e => ({
      title: e,
      dataIndex: `meta_dict.${e}`,
      key: `meta_dict.${e}`,
      sorter: (a, b) => {
        // TODO: Write a better logic for the sort

        // Check if its a string and do string sorting
        if ( typeof a.meta_dict[e] === 'string'
            || a.meta_dict[e] instanceof String
            || typeof b.meta_dict[e] === 'string'
            || b.meta_dict[e] instanceof String
          ) {
            const A = a.meta_dict[e] ? a.meta_dict[e] : '';
            const B = b.meta_dict[e] ? b.meta_dict[e] : '';

            return A.localeCompare(B);
          }

        // Do number sorting
        if (!(e in a.meta_dict)) {
          return -999999999999;
        }
        if (!(e in b.meta_dict)) {
          return 999999999999;
        }

        return a.meta_dict[e] - b.meta_dict[e];
      },
    }));

    this.setState({
      outputColumns: [...this.columns, ...fieldColumns],
    });

  }

  render() {
    return (
      <Section name="Assets"
        description="Store assets such as images, text and model files from an experiment along with any meta information associated with it"
        >
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
        <Drawer
            title={this.state.assetName}
            placement="right"
            width={720}
            closable={false}
            onClose={this.closeDrawer}
            visible={this.state.drawerVisible}
          >
          <AssetDrawer
            assetUrl={this.state.assetUrl}
            assetId={this.state.assetId}
            modelId={this.props.match.params.modelId}
            style={{maxWidth: '720px'}} />
        </Drawer>
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
    getAssetBlob: (modelId, AssetId) => dispatch(loadAssetBlob(modelId, AssetId)),
    onExperimentTabSelect: tabKey =>
      dispatch(onExperimentTabSelect(tabKey)),
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
