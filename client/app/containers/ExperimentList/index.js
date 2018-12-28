/**
 *
 * ExperimentList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectLoading } from 'containers/App/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Table, Tag } from 'antd';
import ProjectDetail from 'containers/ProjectDetail/Loadable';
import Header from 'components/Header';
import { makeSelectExperimentList } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loadExperimentAction } from './actions';

export class ExperimentList extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.props.getExperimentData(projectId);
  }

  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          if (text === record.experiment_id) return text.substring(0, 7);
          return text;
        },
      },
      {
        title: 'Submitted By',
        dataIndex: 'submitted_by',
        key: 'submitted_by',
      },
      {
        title: 'Date Created',
        key: 'date_created_epoch',
        dataIndex: 'date_created_epoch',
        render: dt => {
          if (!dt) return '';

          const t = new Date(dt * 1000);
          return t.toString().split('GMT')[0];
        },
      },
      {
        title: 'Tags',
        key: 'labels',
        dataIndex: 'labels',
        render: tags => {
          if (!tags) return '';

          return (
            <span>
              {tags.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          );
        },
      },
    ];
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ExperimentList</title>
          <meta name="description" content="Description of ExperimentList" />
        </Helmet>
        <Header />
        <div style={{ marginTop: '50px' }}>
          <ProjectDetail projectId={this.props.match.params.id} />
        </div>
        <Table
          columns={this.columns}
          dataSource={this.props.experimentList}
          rowKey="id"
          style={{ marginTop: '50px' }}
        />
      </div>
    );
  }
}

ExperimentList.propTypes = {
  getExperimentData: PropTypes.func.isRequired,
  experimentList: PropTypes.array,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  experimentList: makeSelectExperimentList(),
  loading: makeSelectLoading(),

});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentData: projectId => dispatch(loadExperimentAction(projectId)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'experimentList', reducer });
const withSaga = injectSaga({ key: 'experimentList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentList);
