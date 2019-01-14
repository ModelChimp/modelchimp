import React from 'react';
import { Modal, Button } from 'antd';
import ModelchimpClient from 'utils/modelchimpClient';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

class TeamMember extends React.Component {
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
    const { members } = this.props;

    return (
      <div style={this.props.style}>
        <Button type="primary" onClick={this.showModal}>
          <span>
            Team: <b>{members && members.length}</b>
          </span>
        </Button>
        <Modal
          title="Members"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {members &&
            members.map(e => (
              <StyledMember
                key={e.id}
                profilePic={ModelchimpClient.getImageUrl(e.avatar)}
                firstName={e.first_name}
                lastName={e.last_name}
              />
            ))}
        </Modal>
      </div>
    );
  }
}

TeamMember.propTypes = {
  members: PropTypes.array,
  style: PropTypes.object,
};

export default TeamMember;
