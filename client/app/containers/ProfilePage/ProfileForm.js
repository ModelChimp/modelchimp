import React from 'react';
import { Form, Button, Upload, Icon, Input } from 'antd';

class ProfileForm extends React.Component {
  state = {
    uploadDisabled: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = new FormData();
        const valuesKeys = Object.keys(values);

        for (let i = 0; i < valuesKeys.length; i += 1) {
          if (values[valuesKeys[i]] !== undefined) {
            if (valuesKeys[i] === 'avatar') {
              result.append(
                valuesKeys[i],
                values[valuesKeys[i]][0].originFileObj,
                values[valuesKeys[i]][0].name,
              );
            } else {
              result.append(valuesKeys[i], values[valuesKeys[i]]);
            }
          }
        }

        this.props.updateFunc(result);
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  /* customRequest={this.customRequest} */
  // customRequest = ({ abort, filename }) => ({
  //   abort() {
  //     // console.log('upload progress is aborted.');
  //   },
  // });

  onChange = ({ fileList }) => {
    if (fileList.length > 0) {
      this.setState({
        uploadDisabled: true,
      });
    } else {
      this.setState({
        uploadDisabled: false,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="First Name">
          {getFieldDecorator('first_name', {
            rules: [
              {
                message: 'First Name',
              },
            ],
            initialValue: this.props.data.first_name,
          })(<Input placeholder="First Name" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Last Name">
          {getFieldDecorator('last_name', {
            rules: [
              {
                message: 'Last Name',
              },
            ],
            initialValue: this.props.data.last_name,
          })(<Input placeholder="Last Name" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Upload">
          {getFieldDecorator('avatar', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              onChange={this.onChange}
              beforeUpload={() => false}
              disabled={this.state.uploadDisabled}
            >
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
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

const WrappedProfileForm = Form.create({ name: 'profile' })(ProfileForm);

export default WrappedProfileForm;
