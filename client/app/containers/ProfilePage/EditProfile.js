import React from 'react';
import { connect } from 'react-redux';

import ModelchimpClient from 'utils/modelchimpClient';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Form, Select, Button, Upload, Icon, Modal, Input
} from 'antd';
import {makeSelectModalVisible} from './selectors';
import { profileModalOpenAction, profileModalCloseAction } from './actions';
import { createStructuredSelector } from 'reselect';

const { Option } = Select;


class ProfileForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let result = new FormData();
        let valuesKeys = Object.keys(values);

        for(let i=0; i < valuesKeys.length; i+=1){
          if( values[valuesKeys[i]] !== undefined ){
            if(valuesKeys[i] === 'avatar'){
              result.append(valuesKeys[i],  values[valuesKeys[i]][0].originFileObj, values[valuesKeys[i]][0].name );
            } else {
              result.append(valuesKeys[i],  values[valuesKeys[i]]);
            }
          }
        }

        this.props.updateFunc(result);
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  onChange = ({abort, file}) => {
    return {
        abort() {
          console.log('upload progress is aborted.');
        }
      }
    }

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const {last_name} = this.props.data;


    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Item {...formItemLayout} label="First Name">
        {getFieldDecorator('first_name', {
          rules: [{
            message: 'First Name',
          }],
          initialValue:this.props.data.first_name
        })(
          <Input placeholder="First Name" />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Last Name">
        {getFieldDecorator('last_name', {
          rules: [{
            message: 'Last Name',
          }],
          initialValue:this.props.data.last_name
        })(
          <Input placeholder="Last Name"  />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Upload"
      >
        {getFieldDecorator('avatar', {
          valuePropName: 'fileList',
          getValueFromEvent: this.normFile,
        })(
          <Upload name="logo" action="/upload.do" listType="picture" customRequest={this.onChange}>
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 12, offset: 6 }}
      >
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
      </Form>
    );
  }
}

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

class EditProfile extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.props.profileModalOpen();
  };

  handleOk = () => {
    this.props.profileModalClose();
  };

  handleCancel = () => {
    this.props.profileModalClose();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    return (
      <div style={this.props.style}>
        <Button type="primary" onClick={this.showModal}>
          <span>
            Edit
          </span>
        </Button>
        <Modal
          title="Edit Profile"
          visible={this.props.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null} 
        >
        <WrappedProfileForm updateFunc={this.props.updateFunc} data={this.props.data}/>
        </Modal>
      </div>
    );
  }
}

EditProfile.propTypes = {
  style: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  modalVisible: makeSelectModalVisible(),
});

function mapDispatchToProps(dispatch) {
  return {
    profileModalOpen: () =>
      dispatch(profileModalOpenAction()),
    profileModalClose: () =>
      dispatch(profileModalCloseAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

// export default EditProfile;
