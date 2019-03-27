/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Button, Modal, Tag } from 'antd';
import { deleteExperimentLabelsAction, loadExperimentLabelsAction } from './actions';
import LabelItem from './LabelItem';
import LabelForm from './LabelForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import reducer from './reducer';
import saga from './saga';
import { makeSelectLabels } from './selectors';

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

  // componentDidMount(){
  // }

  componentDidUpdate(){
    this.props.dispatch(loadExperimentLabelsAction(this.props.modelId));

  }

  render() {
    const labelDOM = this.props.labelData ? (
      <span style={{ marginLeft: '10px' }}>
        {this.props.labelData.map((tag, i) => {
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
                        : <div>
                            {labelDOM}
                            <FontAwesomeIcon
                            style={{fontSize:'10px'}}
                            icon="edit"
                            onClick={this.showModal} />
                          </div>;

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
          {this.props.labelData &&
            this.props.labelData.map((label, i) => {
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
  labelData: PropTypes.array,
  style: PropTypes.object,
  buttonDisplay: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  labelData: makeSelectLabels(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'label', reducer });
const withSaga = injectSaga({ key: 'label', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Label);
