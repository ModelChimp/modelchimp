import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import Img from 'components/Img';
import LogoPath from 'images/logo_white.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit({
          ...values,
          invite_token: this.props.inviteToken,
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
    if (value && value !== form.getFieldValue('password')) {
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
        <Form.Item>
          {getFieldDecorator('password', {
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
          {getFieldDecorator('confirm_password', {
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
            Register
          </Button>
        </Form.Item>
        <Link to="/login" style={{ float: 'left' }}>
          Login
        </Link>
      </Form>
    );
  }
}

RegistrationForm.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.object,
  inviteToken: PropTypes.string,
};

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm,
);

WrappedRegistrationForm.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.object,
  inviteToken: PropTypes.string,
};

export default WrappedRegistrationForm;
