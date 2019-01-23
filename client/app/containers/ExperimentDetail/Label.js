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
import {makeSelectInvite} from './selectors';
import Section from 'components/Section';
import { Button, Modal, message, Layout, Form, Icon, Input } from 'antd';
import { makeSelectProjectDetail } from 'containers/ProjectDetail/selectors';
import styled from 'styled-components';
import { sendInviteAction, resetStateAction, setMenuKey } from './actions';
import { MEMBERS_KEY } from './constants';

/*
* Member component
*/
const Member = ({ className, profilePic, firstName, lastName }) => (
  <div className={className}>
    <img
      src={profilePic}
      style={{ height: '64px', width: '64px', marginRight: '10px' }}
      alt=""
    />
    <span>{firstName} </span>
    <span>{lastName}</span>
  </div>
);

Member.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  profilePic: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

const StyledMember = styled(Member)`
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dbd8d8;
`;


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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const projectId = this.props.projectId;
        this.props.dispatch(sendInviteAction(values, projectId))
      }
    });
  }

  componentDidUpdate(){
    if(this.props.inviteFlag){
      message.info('Invite sent successfully!');
      this.props.dispatch(resetStateAction());
    }
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
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
            Invite
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{span: 24}}
          style={{width:'70%'}}
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}
         >
           {getFieldDecorator('to_email', {
             rules: [{
               type: 'email', message: 'The input is not valid E-mail!',
             }, {
               required: true, message: 'Please input your E-mail!',
             }],
           })(
             <Input placeholder="Please input the email"/>
           )}
         </Form.Item>
      </Form>
    );
  }
}

const WrappedInviteForm = Form.create({ name: 'invite_form' })(InviteForm);


/*
* Main component
*/
export class Members extends React.Component {
  componentDidMount(){
    this.props.dispatch(setMenuKey(MEMBERS_KEY));
  }

  render() {

    const members = this.props.projectDetail.members;
    const projectId =this.props.match.params.id;


    return members ? (
      <Layout>
      <WrappedInviteForm style={{marginBottom:'30px'}}
        projectId={projectId}
        dispatch={this.props.dispatch}
        inviteFlag={this.props.inviteFlag}
         />
      {members.map((e)=> <StyledMember key={e.id}
                                  firstName={e.first_name}
                                  lastName={e.last_name}
                                  profilePic={e.avatar} />)}
      </Layout>):
      <div>No Members</div>;
  }
}

Members.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectDetail: makeSelectProjectDetail(),
  inviteFlag: makeSelectInvite(),
});

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
