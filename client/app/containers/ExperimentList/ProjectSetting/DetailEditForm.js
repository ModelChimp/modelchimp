import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Row, Col, Button,
} from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProjectDetail } from 'containers/ProjectDetail/selectors';
<<<<<<< HEAD
import { updateProjectAction } from './actions';
=======

>>>>>>> edb75688ab7532ef10b216dfb9fff5685892a480

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const projectId = this.props.projectDetail.id;
        this.props.updateProject(projectId, values);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="Name"
        >
          {getFieldDecorator('name', {
            rules: [ {
               message: 'Please input the project name',
            }],
            initialValue:this.props.projectDetail.name
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Description"
        >
          {getFieldDecorator('description', {
            rules: [{
              message: 'Please add the description',
            }],
            initialValue:this.props.projectDetail.description
          })(
            <Input.TextArea rows={4} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditDetailForm = Form.create({ name: 'editDetails' })(RegistrationForm);


WrappedEditDetailForm.propTypes = {
  updateProject: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectDetail: makeSelectProjectDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateProject: (projectId, projectData) => dispatch(updateProjectAction(projectId, projectData)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedEditDetailForm);


// export default WrappedEditDetailForm;
