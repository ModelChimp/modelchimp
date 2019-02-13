import React from 'react';

import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

class ProjectForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = new FormData();
        const valuesKeys = Object.keys(values);

        for (let i = 0; i < valuesKeys.length; i += 1) {
          if (values[valuesKeys[i]] !== undefined) {
            result.append(valuesKeys[i], values[valuesKeys[i]]);
          }
        }

        this.props.submitFuc(result);
        this.props.form.resetFields();
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                message: 'Project Name',
              },
              {
                required: true,
                message: 'Please input project name',
              },
            ],
          })(<Input placeholder="Project Name" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Description">
          {getFieldDecorator('description', {
            rules: [
              {
                message: 'Description',
              },
              {
                required: true,
                message: 'Please input project description',
              },
            ],
          })(<TextArea rows={4} placeholder="Please give a description" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedProjectForm = Form.create({ name: 'project' })(ProjectForm);

export default WrappedProjectForm;
