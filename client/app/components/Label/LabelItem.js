import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
* LabelItem component
*/
const LabelItem = ({ className, label, modelId, deleteFunc }) => (
  <div className={className}>
    <span>{label} </span>
    <span
      className="font-awesome"
      style={{ float: 'right' }}
      onClick={() => deleteFunc(label, modelId)}
      onKeyDown={() => deleteFunc(label, modelId)}
      role="button"
      tabIndex="0"
    >
      <FontAwesomeIcon icon="trash" style={{ fontSize: '15px' }} />
    </span>
  </div>
);

LabelItem.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  deleteFunc: PropTypes.func,
};

const StyledLabelItem = styled(LabelItem)`
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dbd8d8;

  .font-awesome {
    color: pink;
  }

  .font-awesome:hover {
    color: red;
    cursor: pointer;
  }
`;

export default StyledLabelItem;
