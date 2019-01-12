import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ProjectKey extends React.Component {
  copyToClipboard(e) {
    const copyText = document.getElementById('project-key');
    const textArea = document.createElement('textarea');

    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();

    alert('Project key has been copied');
  }

  render() {
    return (
      <span className={this.props.className}>
        <span>Key: </span>
        <span id="project-key">{this.props.projectKey}</span>
        <button onClick={this.copyToClipboard}>
          <FontAwesomeIcon icon="copy" />
        </button>
      </span>
    );
  }
}

const StyledProjectKey = styled(ProjectKey)`
  background-color: #ededed;
  border-radius: 20px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;

  span:nth-child(1) {
    color: black;
    font-weight: bold;
  }
`;

export default StyledProjectKey;
