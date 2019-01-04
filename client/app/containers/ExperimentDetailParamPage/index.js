/**
 *
 * ExperimentDetailParamPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectExperimentDetailParamPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {loadExperimentParamAction} from './actions';

import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import { Table, Divider, Tag } from 'antd';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailParamPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [{
      title: 'Parameter',
      dataIndex: 'param',
      key: 'param',
      width: '20vw'
    }, {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '60vw'
    }];

    this.props.getExperimentParamData(this.modelId);
  }

  render() {
    return <ExperimentDetail modelId={this.modelId}>
      <Section name="Parameters">
        <Table columns={this.columns} dataSource={this.props.paramData} />
      </Section>
    </ExperimentDetail>;
  }
}

ExperimentDetailParamPage.propTypes = {
  getExperimentParamData: PropTypes.func.isRequired,
  paramData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  paramData: makeSelectExperimentDetailParamPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentParamData: modelId =>
      dispatch(loadExperimentParamAction(modelId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'experimentDetailParamPage',
  reducer,
});
const withSaga = injectSaga({ key: 'experimentDetailParamPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailParamPage);
