import React from 'react';
import ModelchimpClient from 'utils/modelchimpClient';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col,Modal, Input
} from 'antd';

const { Option } = Select;


class EditProfile extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
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
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <WrappedProfileForm updateFunc={this.props.updateFunc}/>
        </Modal>
      </div>
    );
  }
}

EditProfile.propTypes = {
  style: PropTypes.object,
};

class ProfileForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.updateFunc(values);
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
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Item {...formItemLayout} label="First Name">
        {getFieldDecorator('firstName', {
          rules: [{
            message: 'First Name',
          }],
        })(
          <Input placeholder="First Name" />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Last Name">
        {getFieldDecorator('lasttName', {
          rules: [{
            message: 'Last Name',
          }],
        })(
          <Input placeholder="Last Name" />
        )}
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Upload"
      >
        {getFieldDecorator('upload', {
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

export default EditProfile;
