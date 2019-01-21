import React from 'react';
import { connect } from 'react-redux';

import ModelchimpClient from 'utils/modelchimpClient';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Form, Select, Button, Upload, Icon, Modal, Input
} from 'antd';
import {makeSelectModalVisible} from './selectors';
import { projectModalOpen, projectModalClose, createProject } from './actions';
import { createStructuredSelector } from 'reselect';

const { Option } = Select;
const { TextArea } = Input;

class ProfileForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let result = new FormData();
        let valuesKeys = Object.keys(values);

        for(let i=0; i < valuesKeys.length; i+=1){
          if( values[valuesKeys[i]] !== undefined ){
              result.append(valuesKeys[i],  values[valuesKeys[i]]);
          }
        }

        this.props.submitFuc(result);
        this.props.form.resetFields();
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


    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Item {...formItemLayout} label="Name">
        {getFieldDecorator('name', {
          rules: [{
            message: 'Project Name',
          },
          {
            required: true, message: 'Please input project name',
          }
        ],
        })(
          <Input placeholder="Project Name" />
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Description">
        {getFieldDecorator('description', {
          rules: [{
            message: 'Description',
          },
          {
            required: true, message: 'Please input project description',
          }
        ],
        })(
          <TextArea rows={4} placeholder="Please give a description"  />
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
            Create Project
          </span>
        </Button>
        <Modal
          title="Create Project"
          visible={this.props.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
        <WrappedProfileForm submitFuc={this.props.createProject}/>
        </Modal>
      </div>
    );
  }
}

CreateProject.propTypes = {
  style: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  modalVisible: makeSelectModalVisible(),
});

function mapDispatchToProps(dispatch) {
  return {
    profileModalOpen: () =>
      dispatch(projectModalOpen()),
    profileModalClose: () =>
      dispatch(projectModalClose()),
    createProject: (values) =>
      dispatch(createProject(values)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
