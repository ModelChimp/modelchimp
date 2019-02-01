import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { createStructuredSelector } from 'reselect';
import { makeSelectModalVisible } from './selectors';
import { profileModalOpenAction, profileModalCloseAction } from './actions';
import ProfileForm from './ProfileForm';

class EditProfile extends React.Component {
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
          <span>Edit</span>
        </Button>
        <Modal
          title="Edit Profile"
          visible={this.props.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <ProfileForm
            updateFunc={this.props.updateFunc}
            data={this.props.data}
          />
        </Modal>
      </div>
    );
  }
}

EditProfile.propTypes = {
  style: PropTypes.object,
  profileModalOpen: PropTypes.func,
  profileModalClose: PropTypes.func,
  modalVisible: PropTypes.bool,
  updateFunc: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  modalVisible: makeSelectModalVisible(),
});

function mapDispatchToProps(dispatch) {
  return {
    profileModalOpen: () => dispatch(profileModalOpenAction()),
    profileModalClose: () => dispatch(profileModalCloseAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);

// export default EditProfile;
