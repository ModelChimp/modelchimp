import React from 'react';
import { Modal, Button } from 'antd';
import ModelchimpClient from 'utils/modelchimpClient';
import styled from 'styled-components';

const Member = ({ className, profilePic, first_name, last_name }) =>
  <div  className={className}>
    <img src={profilePic} style={{height:"64px",width:"64px", marginRight:"10px"}} />
    <span>{first_name} </span>
    <span>{last_name}</span>
  </div>;


const StyledMember = styled(Member)`
  font-size:20px;
  padding-bottom:10px;
  border-bottom:1px solid #dbd8d8;
`;

class TeamMember extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const members = this.props.members;

    return (
      <div style={this.props.style}>
        <Button type="primary" onClick={this.showModal}>
          <span>Team: <b>{members && members.length}</b></span>
        </Button>
        <Modal
          title="Members"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        { members && members.map(
          (e,i) => <StyledMember key={i}
                                profilePic={ModelchimpClient.getImageUrl(e.avatar)}
                                first_name={e.first_name}
                                last_name={e.last_name} />
        )}
        </Modal>
      </div>
    );
  }
}




export default TeamMember;
