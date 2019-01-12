import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class ProjectKey extends React.Component {
  copyToClipboard() {
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
        <button onClick={this.copyToClipboard} type="button">
          <FontAwesomeIcon icon="copy" />
        </button>
      </span>
    );
  }
}

ProjectKey.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  projectKey: PropTypes.string
};

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
