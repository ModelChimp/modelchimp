/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Form, Icon, Input, Button, Alert } from 'antd';
import Img from 'components/Img';
import LogoPath from 'images/logo_white.png';
import { Link } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmitForm(values.userName, values.password);
      }

      this.props.form.resetFields();
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const errorMsg = this.props.errorMsg ? (
      <Alert message={this.props.errorMsg} type="error" />
    ) : (
      ''
    );

    return (
      <div className="form-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Img src={LogoPath} />
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />,
            )}
          </FormItem>
          {errorMsg}
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </FormItem>
        </Form>
        <Link to="/register" style={{ float: 'left' }}>
          Register
        </Link>
        <ForgotPassword style={{ float: 'right' }} />
      </div>
    );
  }
}

NormalLoginForm.propTypes = {
  form: PropTypes.object,
  onSubmitForm: PropTypes.func,
  errorMsg: PropTypes.any,
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
