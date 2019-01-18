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
import {makeSelectUpdateFlag, makeSelectDeleteFlag} from './selectors';
import Section from 'components/Section';
import { Button, Modal, message, Layout } from 'antd';
import { makeSelectProjectDetail } from 'containers/ProjectDetail/selectors';
import styled from 'styled-components';

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



/* eslint-disable react/prefer-stateless-function */
export class Members extends React.Component {
  render() {
    const members = this.props.projectDetail.members;
    return members ? (
      <Layout>
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
  // updateFlag: makeSelectUpdateFlag(),
  // deleteFlag: makeSelectDeleteFlag(),
  projectDetail: makeSelectProjectDetail(),
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
