/**
 *
 * IdBlock
 *
 */

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const IdBlock = ({copy, display, style, className}) => {
  const copyToClipboard = (e) => {
    let textArea = document.createElement("textarea");

    textArea.value = copy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();

    alert("Experiment id has been copied")
  };


  return <span className={className} style={style}>
      {display}
    <button  onClick={copyToClipboard}>
        <FontAwesomeIcon icon="copy" />
    </button>
  </span>;
}

const StyledIdBlock = styled(IdBlock)`
  border: 1px solid black;

  padding-left:2px;
  padding-bottom:3px;
  padding-top:2px;
  border-radius:3px;
  line-height:19px;

  button {
    background-color:#41addd;
    color:white;
    border:1px solid black;
    border-bottom:1px solid black;
    border-top-right-radius:3px;
    border-bottom-right-radius:3px;
    margin-left:3px;
  }
`;

export default StyledIdBlock;