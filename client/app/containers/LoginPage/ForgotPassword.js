/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button, Modal, message, Layout, Form, Icon, Input, Tag } from 'antd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forgotPassword } from './actions';
// import { makeSelectExperimentDetail } from './selectors';

/*
* Label Form
*/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ForgotPasswordForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(forgotPassword(values.email))
        this.props.form.resetFields();
      }
    });
  }

  componentDidUpdate(){
    // if(this.props.inviteFlag){
    //   message.info('Invite sent successfully!');
    //   this.props.dispatch(resetStateAction());
    // }
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const labelError = isFieldTouched('label') && getFieldError('label');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={this.props.style}>

        <Form.Item
        style={{width:'70%'}}
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
             />
          )}
        </Form.Item>
        <Form.Item
          style={{width:'20%'}}
          >
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{width:'150%'}}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedForgotPasswordForm = Form.create({ name: 'forgot_password_form' })(ForgotPasswordForm);


/*
* Main component
*/
export class ForgotPassword extends React.Component {
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

  render() {

    return <div style={this.props.style}>
        <a onClick={this.showModal}>
          Forgot Password
        </a>
      <Modal
        title="Forgot Password"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
      >
        <WrappedForgotPasswordForm style={{marginBottom:'30px'}}
          dispatch={this.props.dispatch}
           />
      </Modal>
    </div>;
  }
}

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // experiment: makeSelectExperimentDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
