/**
 *
 * Experiment Table
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Table, Tag, Icon } from 'antd';
import LoadingIndicator from 'components/LoadingIndicator';
import { Link } from 'react-router-dom';
import {
  makeSelectExperimentList,
  makeSelectExperimentColumns,
  makeSelectExperimentMetricColumns,
  makeSelectExperimentColumnsPID,
  makeSelectLoading,
} from './selectors';
import { getDataAction, loadExperimentAction } from './actions';
import { onMenuSelectionAction } from './ExperimentMenu/actions';
import { MENU_EXPERIMENT } from './ExperimentMenu/constants';
import Label from 'containers/Label/Loadable';


/* eslint-disable react/prefer-stateless-function */
export class ExperimentTable extends React.Component {
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

          return <Link to={`/experiment-detail/${record.id}`}>{result}</Link>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: text => {
          if (text === 1)
            return <Icon type="sync" spin style={{ color: 'orange' }} />;

          return (
            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          );
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
        sorter: (a, b) => a.date_created_epoch - b.date_created_epoch,
      },
      {
        title: 'Tags',
        key: 'labels',
        dataIndex: 'labels',
        render: (tags,record) => {
          // if (!tags) return '';
          // const tagsDOM = tags ?
          //                   tags.map(tag => (
          //                       <Tag color="blue" key={tag}>
          //                         {tag}
          //                       </Tag>
          //                   ))
          //                   : null;

          return (
            <span>
              <Label
                style={{ display: 'inline' }}
                labels={tags}
                buttonDisplay={false}
                modelId={record.id}
              />
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    const projectId = this.props.match.params.id;

    this.props.menuSelection(MENU_EXPERIMENT);
    this.props.initiateDataFetch();
    this.props.getExperimentData(projectId);

    this.timer = setInterval(() => {
      this.props.getExperimentData(projectId);
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  addOptionalColumns(data) {
    const opCol = this.props.optionalColumns;
    const opMCol = this.props.optionalMetricColumns;

    const result = [];

    if (this.props.match.params.id !== this.props.optionalColumnsPID)
      return data;

    // Add metric columns
    if (opMCol && opMCol.length > 0) {
      for (let i = 0; i < opMCol.length; i += 1) {
        const metric = opMCol[i];
        let metricName = metric.split('$');
        metricName =
          metricName[1] === '1'
            ? `${metricName[0]}(max)`
            : `${metricName[0]}(min)`;

        result.push({
          title: metricName,
          dataIndex: `metric_fields.${metric}`,
          key: opMCol[i],
          render: text => (text ? Math.round(text * 100) / 100 : null),
          // TODO: Improve the logic later
          sorter: (a, b) => {
            if (!(metric in a.metric_fields)) {
              return -999999999999;
            }
            if (!(metric in b.metric_fields)) {
              return 999999999999;
            }

            return a.metric_fields[metric] - b.metric_fields[metric];
          },
        });
      }
    }

    // Add parameter columns
    if (opCol && opCol.length > 0) {
      for (let i = 0; i < opCol.length; i += 1) {
        const param = opCol[i];

        result.push({
          title: param,
          dataIndex: `param_fields.${param}`,
          key: param,
          // TODO: Improve the logic later
          sorter: (a, b) => {
            if (!(param in a.param_fields)) {
              return -999999999999;
            }
            if (!(param in b.param_fields)) {
              return 999999999999;
            }

            return a.param_fields[param] - b.param_fields[param];
          },
        });
      }
    }

    return [...data, ...result];
  }

  render() {
    return this.props.loading ? (
      <LoadingIndicator />
    ) : (
      <Table
        columns={this.addOptionalColumns(this.columns)}
        dataSource={this.props.experimentList}
        rowKey="id"
      />
    );
  }
}

ExperimentTable.propTypes = {
  getExperimentData: PropTypes.func.isRequired,
  experimentList: PropTypes.array,
  optionalColumns: PropTypes.array,
  optionalColumnsPID: PropTypes.string,
  loading: PropTypes.bool,
  initiateDataFetch: PropTypes.func,
  optionalMetricColumns: PropTypes.array,
  match: PropTypes.object,
  menuSelection: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  experimentList: makeSelectExperimentList(),
  loading: makeSelectLoading(),
  optionalColumns: makeSelectExperimentColumns(),
  optionalMetricColumns: makeSelectExperimentMetricColumns(),
  optionalColumnsPID: makeSelectExperimentColumnsPID(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentData: projectId => dispatch(loadExperimentAction(projectId)),
    initiateDataFetch: () => dispatch(getDataAction()),
    menuSelection: key => dispatch(onMenuSelectionAction(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperimentTable);
