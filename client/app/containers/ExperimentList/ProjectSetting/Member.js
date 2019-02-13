import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export default StyledMember;
