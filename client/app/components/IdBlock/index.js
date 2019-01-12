/**
 *
 * IdBlock
 *
 */

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const IdBlock = ({ copy, display, style, className }) => {
  const copyToClipboard = () => {
    const textArea = document.createElement('textarea');

    textArea.value = copy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();

    alert('Experiment id has been copied');
  };

  return (
    <span className={className} style={style}>
      {display}
      <button onClick={copyToClipboard} type="button">
        <FontAwesomeIcon icon="copy" />
      </button>
    </span>
  );
};

IdBlock.propTypes = {
  copy: PropTypes.string,
  display: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};

const StyledIdBlock = styled(IdBlock)`
  border: 1px solid black;

  padding-left: 2px;
  padding-bottom: 3px;
  padding-top: 2px;
  border-radius: 3px;
  line-height: 19px;

  button {
    background-color: #41addd;
    color: white;
    border: 1px solid black;
    border-bottom: 1px solid black;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    margin-left: 3px;
  }
`;

export default StyledIdBlock;
