/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectUpdateFlag, makeSelectDeleteFlag} from './selectors';
import Section from 'components/Section';
import { Button, Modal,message } from 'antd';
import { makeSelectProjectDetail } from 'containers/ProjectDetail/selectors';
import DetailEditForm from './DetailEditForm';
import {resetStateAction, deleteProjectAction, setMenuKey} from './actions';
import { Redirect } from 'react-router-dom';
import { DETAILS_KEY } from './constants';


/* eslint-disable react/prefer-stateless-function */
export class Detail extends React.Component {
  state = {
    detailModalVisible: false,
    deleteModalVisible: false
   };

  handleOk = () => {
    this.setState({
      detailModalVisible: false,
      deleteModalVisible: false
      });
  };

  handleCancel = () => {
    this.setState({
      detailModalVisible: false,
      deleteModalVisible: false
      });
  };

  showDetailModal = () => {
    this.setState({
      detailModalVisible: true,
    });
  };

  showDeleteModal = () => {
    this.setState({
      deleteModalVisible: true,
    });
  };

  deleteProject = () => {
    const projectId = this.props.projectDetail.id;
    this.props.deleteProject(projectId);
  };

  componentDidUpdate(){
    if(this.props.updateFlag){
      message.info('Success');
      this.props.resetState();
    }

    if(this.props.deleteFlag){
      message.info('Project Successfully Deleted');
      this.props.resetState();

    }
  }

  componentDidMount(){
    this.props.setMenuKey(DETAILS_KEY);
  }

  render() {
    if(this.props.deleteFlag) return <Redirect to="/projects" />;

    return <div>
      <div>
      <b>Project Name:</b>  {this.props.projectDetail.name}
      </div>
      <div>
      <b>Project Description:</b>  {this.props.projectDetail.description}
      </div>
      <div style={{marginTop:'20px'}}>
        <Button type="primary" onClick={this.showDetailModal}>
          <span>Edit Details</span>
        </Button>
        <Button type="danger" onClick={this.showDeleteModal} style={{ marginLeft: '20px'}}>
          <span>Delete Project</span>
        </Button>
      </div>

      <Modal
        title="Edit Details"
        visible={this.state.detailModalVisible}
        onCancel={this.handleCancel}
        footer={null}
        >
        <DetailEditForm />
      </Modal>
      <Modal
        title="Delete Project"
        visible={this.state.deleteModalVisible}
        onCancel={this.handleCancel}
        footer={null}
        >
        Are you sure you want to delete this project?
        <div style={{textAlign:'center', marginTop:'20px'}}>
          <Button type="danger" htmlType="submit" onClick={this.deleteProject}>
            DELETE PROJECT
          </Button>
        </div>
      </Modal>

    </div>;
  }
}

Detail.propTypes = {
  resetState: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  updateFlag: makeSelectUpdateFlag(),
  deleteFlag: makeSelectDeleteFlag(),
  projectDetail: makeSelectProjectDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetState: () => dispatch(resetStateAction()),
    deleteProject: (projectId) => dispatch(deleteProjectAction(projectId)),
    setMenuKey: (key) => dispatch(setMenuKey(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
