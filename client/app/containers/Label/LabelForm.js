import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { createExperimentLabelsAction } from './actions';
/*
* Label Form
*/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LabelForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { modelId } = this.props;
        this.props.dispatch(createExperimentLabelsAction(modelId, values));
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const labelError = isFieldTouched('label') && getFieldError('label');
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
            Add
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ width: '70%' }}
          validateStatus={labelError ? 'error' : ''}
          help={labelError || ''}
        >
          {getFieldDecorator('label', {
            rules: [
              {
                required: true,
                message: 'Please input label!',
              },
            ],
          })(<Input placeholder="Please input the label" />)}
        </Form.Item>
      </Form>
    );
  }
}

LabelForm.propTypes = {
  form: PropTypes.object,
  modelId: PropTypes.number,
  dispatch: PropTypes.func,
  style: PropTypes.object,
};

const WrappedLabelForm = Form.create({ name: 'label_form' })(LabelForm);

export default WrappedLabelForm;
