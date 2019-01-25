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
import Section from 'components/Section';
import { Button, Modal, message, Layout, Form, Icon, Input, Tag } from 'antd';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createExperimentLabelsAction, deleteExperimentLabelsAction } from './actions';
import { makeSelectExperimentDetail } from './selectors';

/*
* Member component
*/
const LabelItem = ({ className, label, deleteFunc }) => (
  <div className={className}>
    <span>{label} </span>
    <span style={{float:'right'}} onClick={ () => deleteFunc(label)} >
      <FontAwesomeIcon icon="trash" style={{fontSize:'15px', color:'pink'}} />
    </span>
  </div>
);

LabelItem.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
};

const StyledLabelItem = styled(LabelItem)`
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dbd8d8;
`;


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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const modelId = this.props.modelId;
        this.props.dispatch(createExperimentLabelsAction(modelId, values))
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
          style={{width:'20%'}}
          >
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            style={{width:'150%'}}
          >
            Add
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{span: 24}}
          style={{width:'70%'}}
          validateStatus={labelError ? 'error' : ''}
          help={labelError || ''}
         >
           {getFieldDecorator('label', {
             rules: [{
               required: true, message: 'Please input label!',
             }],
           })(
             <Input placeholder="Please input the label"/>
           )}
         </Form.Item>
      </Form>
    );
  }
}

const WrappedLabelForm = Form.create({ name: 'label_form' })(LabelForm);


/*
* Main component
*/
export class Label extends React.Component {
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

  handleDelete = (label) => {
    const modelId = this.props.experiment.id;
    this.props.dispatch(deleteExperimentLabelsAction(modelId,label));
  };

  render() {

    // const members = this.props.projectDetail.members;
    // const projectId =this.props.match.params.id;
    const labelDOM =  this.props.labels ? (
      <span style={{marginLeft:'10px'}}>
        { this.props.labels.map((tag,i) => (
          <Tag color="blue" key={i}>
            {tag}
          </Tag>
        )) }
      </span>
    ): null;

    return <div style={this.props.style}>

      <Button type="primary" onClick={this.showModal} >
        <span>
          Labels
        </span>
      </Button>

      {labelDOM}

      <Modal
        title="Labels"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
      >
        <WrappedLabelForm style={{marginBottom:'30px'}}
          dispatch={this.props.dispatch}
          modelId={this.props.experiment.id}
           />
         {this.props.labels && this.props.labels.map( (label, i) => {
           return <StyledLabelItem key={i} label={label} deleteFunc={this.handleDelete} />
         })}
      </Modal>
    </div>;
  }
}

Label.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  experiment: makeSelectExperimentDetail(),
  // inviteFlag: makeSelectInvite(),
});

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Label);
