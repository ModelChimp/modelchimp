import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import Img from 'components/Img';
import LogoPath from 'images/logo_white.png';
import PropTypes from 'prop-types';

class PasswordResetForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit({
          ...values,
          uid: this.props.uid,
          token: this.props.token,
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      confirmDirty: prevState.confirmDirty || !!value,
    }));
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('new_password1')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Img src={LogoPath} />
        <Form.Item>
          {getFieldDecorator('new_password1', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="password"
              type="password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('new_password2', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="confirm password"
              type="password"
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reset
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

PasswordResetForm.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  uid: PropTypes.string,
  token: PropTypes.string,
};

const WrappedPasswordResetForm = Form.create({ name: 'password_reset' })(
  PasswordResetForm,
);

export default WrappedPasswordResetForm;
