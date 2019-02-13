import React from 'react';
import PropTypes from 'prop-types';
import { Button, message, Form, Input } from 'antd';
import { sendInviteAction, resetStateAction } from './actions';

/*
* Invite Form
*/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class InviteForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { projectId } = this.props;
        this.props.dispatch(sendInviteAction(values, projectId));
      }
    });
  };

  componentDidUpdate() {
    if (this.props.inviteFlag) {
      message.info('Invite sent successfully!');
      this.props.dispatch(resetStateAction());
    }
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        style={this.props.style}
      >
        <Form.Item style={{ width: '20%' }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{ width: '150%' }}
          >
            Invite
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ width: '70%' }}
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
        >
          {getFieldDecorator('to_email', {
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
          })(<Input placeholder="Please input the email" />)}
        </Form.Item>
      </Form>
    );
  }
}

InviteForm.propTypes = {
  form: PropTypes.object,
  projectId: PropTypes.string,
  dispatch: PropTypes.func,
  style: PropTypes.object,
  inviteFlag: PropTypes.bool,
};

const WrappedInviteForm = Form.create({ name: 'invite_form' })(InviteForm);

export default WrappedInviteForm;
