/**
 *
 * ExperimentDetailObjectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import { Table, Divider, Tag } from 'antd';
import IdBlock from 'components/IdBlock';
import makeSelectExperimentDetailObjectPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentObjectAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailObjectPage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [
      {
        title: 'Object Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Id',
        dataIndex: 'custom_object_id',
        key: 'custom_object_id',
        render: text => <IdBlock copy={text} display={text} />,
      },
    ];

    this.props.getExperimentObjectData(this.modelId);
  }

  render() {
    return (
      <ExperimentDetail
        modelId={this.props.match.params.modelId}
        selectedKeys="5"
      >
        <Section name="Objects">
          <Table
            columns={this.columns}
            dataSource={this.props.objectData}
            rowKey="id"
          />
        </Section>
      </ExperimentDetail>
    );
  }
}

ExperimentDetailObjectPage.propTypes = {
  getExperimentObjectData: PropTypes.func.isRequired,
  objectData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  objectData: makeSelectExperimentDetailObjectPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentObjectData: modelId =>
      dispatch(loadExperimentObjectAction(modelId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'experimentDetailObjectPage',
  reducer,
});
const withSaga = injectSaga({ key: 'experimentDetailObjectPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailObjectPage);
