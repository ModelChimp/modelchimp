/**
 *
 * ProjectDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectProjectDetail, makeSelectProjectKey} from './selectors';
import reducer from './reducer';
import {projectDetailSaga} from './saga';
import { Breadcrumb } from 'antd';

import { loadProjectDetailAction } from './actions';

import ProjectKey from './ProjectKey';
import TeamMember from './TeamMember';

export class ProjectDetail extends React.Component {
  componentDidMount() {
    this.props.getProjectDetailData(this.props.projectId);
  }

  render() {
    return (
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item><a href="/projects">Projects</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href={`/experiment-list/${this.props.projectId}`}>{this.props.projectDetail.name}</a></Breadcrumb.Item>
        </Breadcrumb>
        <h1 style={{marginTop:"20px"}}>{this.props.projectDetail.name}</h1>
        <p>{this.props.projectDetail.description}</p>
        <div>
          <ProjectKey projectKey={this.props.projectKey} />
          <TeamMember members={this.props.projectDetail.members}
                      style={{display:"inline", float:"right"}} />
        </div>

      </div>
    );
  }
}

ProjectDetail.propTypes = {
  projectDetail: PropTypes.object,
  getProjectDetailData: PropTypes.func,
  projectId: PropTypes.string,
  projectKey: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  projectDetail: makeSelectProjectDetail(),
  projectKey: makeSelectProjectKey()
});

function mapDispatchToProps(dispatch) {
  return {
    getProjectDetailData: projectId =>
      dispatch(loadProjectDetailAction(projectId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectDetail', reducer });
const withSaga = injectSaga({ key: 'projectDetail', saga: projectDetailSaga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectDetail);
