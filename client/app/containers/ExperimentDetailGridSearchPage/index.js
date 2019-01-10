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
import makeSelectExperimentDetailGridSearchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {loadExperimentGridSearchAction} from './actions';

import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import { Table, Divider, Tag } from 'antd';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailGridSearchPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [{
      title: 'GridSearch',
      dataIndex: 'gridsearch',
      key: 'gridsearch',
    }, {
      title: 'Max',
      dataIndex: 'max',
      key: 'max',
    }, {
      title: 'Min',
      dataIndex: 'min',
    },];

    // this.props.getExperimentGridSearchData(this.modelId);
  }

  render() {
    return <ExperimentDetail modelId={this.props.match.params.modelId} selectedKeys={'6'}>
      <Section name="GridSearch">
        Hello
        <Table columns={this.columns} dataSource={this.props.gridsearchData} />
      </Section>
    </ExperimentDetail>;
  }
}

ExperimentDetailGridSearchPage.propTypes = {
  getExperimentGridSearchData: PropTypes.func.isRequired,
  gridsearchData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  gridsearchData: makeSelectExperimentDetailGridSearchPage(),
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
