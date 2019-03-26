/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Button, Modal, Tag } from 'antd';
import { deleteExperimentLabelsAction } from './actions';
import LabelItem from './LabelItem';
import LabelForm from './LabelForm';

/*
* Main component
*/
export class Label extends React.Component {
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

  handleDelete = label => {
    const modelId = this.props.modelId;
    this.props.dispatch(deleteExperimentLabelsAction(modelId, label));
  };

  render() {
    // const members = this.props.projectDetail.members;
    // const projectId =this.props.match.params.id;
    const labelDOM = this.props.labels ? (
      <span style={{ marginLeft: '10px' }}>
        {this.props.labels.map((tag, i) => {
          const index = `index-${i}`;

          return (
            <Tag color="blue" key={index}>
              {tag}
            </Tag>
          );
        })}
      </span>
    ) : null;


    const buttonDOM = this.props.buttonDisplay ?
                        <div>
                          <Button type="primary" onClick={this.showModal}>
                            <span>Labels</span>
                          </Button>
                          {labelDOM}
                        </div>
                        : null;

    return (
      <div style={this.props.style}>


        {buttonDOM}

        <Modal
          title="Labels"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <LabelForm
            style={{ marginBottom: '30px' }}
            dispatch={this.props.dispatch}
            modelId={this.props.modelId}
          />
          {this.props.labels &&
            this.props.labels.map((label, i) => {
              const index = i;

              return (
                <LabelItem
                  key={index}
                  label={label}
                  deleteFunc={this.handleDelete}
                />
              );
            })}
        </Modal>
      </div>
    );
  }
}

Label.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modelId: PropTypes.number,
  labels: PropTypes.array,
  style: PropTypes.object,
  buttonDisplay: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Label);
