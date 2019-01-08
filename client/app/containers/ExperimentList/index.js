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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Table, Tag, Icon } from 'antd';
import ProjectDetail from 'containers/ProjectDetail/Loadable';
import HeaderWrapper from 'containers/HeaderWrapper';
import { makeSelectExperimentList,
          makeSelectExperimentColumns,
          makeSelectExperimentColumnsPID,
          makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getDataAction, loadExperimentAction } from './actions';
import { Layout } from 'antd';
import ContentCentered from 'components/ContentCentered';
import Content from 'components/Content';
import { Link } from "react-router-dom";
import ExperimentMenu from './ExperimentMenu/index.js';
import LoadingIndicator from 'components/LoadingIndicator';

export class ExperimentList extends React.Component {
  componentDidMount() {
    const projectId = this.props.match.params.id;

    this.props.initiateDataFetch();
    this.props.getExperimentData(projectId);

    this.timer = setInterval(()=>{
      this.props.getExperimentData(projectId);
    },2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          let result = text;

          if (text === record.experiment_id) result = text.substring(0, 7);

          return <Link to={`/experiment-detail/${record.id}`}>
                  {result}
                </Link>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
          if(text === 1) return <Icon type="sync" spin style={{color:'orange'}}/>;

          return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
        }
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
    console.log(this.props.loading);
    return (
      <Layout className="layout">
        <Helmet>
          <title>ExperimentList</title>
          <meta name="description" content="Description of ExperimentList" />
        </Helmet>
        <HeaderWrapper />

        <Content>
          <div style={{ marginTop: '50px' }}>
            <ProjectDetail projectId={this.props.match.params.id} />
          </div>
          <ExperimentMenu style={{ marginTop: '50px', background:'#F0F2F5' }}
              projectId={this.props.match.params.id}
              />
            { this.props.loading ? (<LoadingIndicator />):
              (<Table
                columns={this.addOptionalColumns(this.columns)}
                dataSource={this.props.experimentList}
                rowKey="id"
                style={{ marginTop: '50px' }}
              />)
            }
      </Content>
    </Layout>
    );
  }

  addOptionalColumns(data) {
    const opCol = this.props.optionalColumns;
    let result = [];

    if(this.props.match.params.id !== this.props.optionalColumnsPID) return data;

    if(opCol && opCol.length > 0) {
        for(var i in opCol){
          result.push({
            title: opCol[i],
            dataIndex: `param_fields.${opCol[i]}`,
            key: opCol[i],
          });
        }
    } else {
      return data;
    }

    return [...data, ...result];
  }
}

ExperimentList.propTypes = {
  getExperimentData: PropTypes.func.isRequired,
  experimentList: PropTypes.array,
  optionalColumns:PropTypes.array,
  optionalColumnsPID: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  experimentList: makeSelectExperimentList(),
  loading: makeSelectLoading(),
  optionalColumns: makeSelectExperimentColumns(),
  optionalColumnsPID: makeSelectExperimentColumnsPID(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentData: projectId => dispatch(loadExperimentAction(projectId)),
    initiateDataFetch: () => dispatch(getDataAction()),
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
