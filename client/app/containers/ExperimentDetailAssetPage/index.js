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
import { Table } from 'antd';
import makeSelectExperimentDetailAssetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentAssetAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailAssetPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [
      {
        title: 'File Name',
        dataIndex: 'file_name',
        key: 'file_name',
        width: '20vw',
      },
      // {
      //   title: 'Value',
      //   dataIndex: 'value',
      //   key: 'value',
      //   width: '60vw',
      // },
    ];

    this.props.getExperimentAssetData(this.modelId);
  }

  render() {
    console.log(this.props.assetData);
    return (
      <Section name="Assets">
        <Table columns={this.columns} dataSource={this.props.assetData} />
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
