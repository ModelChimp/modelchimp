import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeSelectModalVisible } from './selectors';
import { projectModalOpen, projectModalClose, createProject } from './actions';
import ProjectForm from './ProjectForm';

class CreateProject extends React.Component {
  showModal = () => {
    this.props.profileModalOpen();
  };

  handleOk = () => {
    this.props.profileModalClose();
  };

  handleCancel = () => {
    this.props.profileModalClose();
  };

  render() {
    return (
      <div style={this.props.style}>
        <Button type="primary" onClick={this.showModal}>
          <span>Create Project</span>
        </Button>
        <Modal
          title="Create Project"
          visible={this.props.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <ProjectForm submitFuc={this.props.createProject} />
        </Modal>
      </div>
    );
  }
}

CreateProject.propTypes = {
  style: PropTypes.object,
  profileModalOpen: PropTypes.func,
  profileModalClose: PropTypes.func,
  createProject: PropTypes.func,
  modalVisible: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  modalVisible: makeSelectModalVisible(),
});

function mapDispatchToProps(dispatch) {
  return {
    profileModalOpen: () => dispatch(projectModalOpen()),
    profileModalClose: () => dispatch(projectModalClose()),
    createProject: values => dispatch(createProject(values)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProject);
