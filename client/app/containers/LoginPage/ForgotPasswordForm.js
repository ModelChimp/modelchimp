import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input } from 'antd';
import { forgotPassword } from './actions';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ForgotPasswordForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(forgotPassword(values));
        this.props.form.resetFields();
        this.props.onOk();
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <Form
        layout="vertical"
        onSubmit={this.handleSubmit}
        style={this.props.style}
      >
        <Form.Item style={{ width: '70%' }}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ width: '20%' }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{ width: '150%' }}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForgotPasswordForm = Form.create({ name: 'forgot_password_form' })(
  ForgotPasswordForm,
);

ForgotPasswordForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object,
  onOk: PropTypes.func,
  style: PropTypes.object,
};

export default WrappedForgotPasswordForm;
