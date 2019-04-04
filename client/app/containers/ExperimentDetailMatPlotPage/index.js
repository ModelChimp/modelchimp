/**
 *
 * ExperimentDetailMatPlotPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section';
import { Table, Modal } from 'antd';
import makeSelectExperimentDetailMatPlotPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentMatPlotAction } from './actions';

import { EXPERIMENT_TAB_MATPLOTS } from '../ExperimentDetail/constants';
import { onExperimentTabSelect } from '../ExperimentDetail/actions';


/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailMatPlotPage extends React.Component {
  state = { visible: false };

  showModal = (plotPath) => {
    this.setState({
      visible: true,
      plotPath
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      plotPath: null,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      plotPath: null,
    });
  };

  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.props.onExperimentTabSelect(EXPERIMENT_TAB_MATPLOTS);
    this.props.getExperimentMatPlotData(this.modelId);
  }

  render() {
    const plotsDOM = this.props.matPlotData ? (
      this.props.matPlotData.map(
        e=> <img src={e.mat_plot_file}
                  style={{margin:'5px'}}
                  onClick={() => this.showModal(e.mat_plot_file)}/>
    )
    ) : null;

    return (
      <Section name="MatPlots"
        description="Store and view the Matplots generated in an experiment"
        >
      {plotsDOM}
      <Modal
        title="Plot"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
        width={'60vw'}
        style={{textAlign:'center'}}
      >
       <img src={this.state.plotPath} style={{maxWidth:'100%'}}/>
      </Modal>
      </Section>
    );
  }
}

ExperimentDetailMatPlotPage.propTypes = {
  getExperimentMatPlotData: PropTypes.func.isRequired,
  matPlotData: PropTypes.array,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  matPlotData: makeSelectExperimentDetailMatPlotPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentMatPlotData: modelId =>
      dispatch(loadExperimentMatPlotAction(modelId)),
    onExperimentTabSelect: tabKey =>
      dispatch(onExperimentTabSelect(tabKey)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'ExperimentDetailMatPlotPage',
  reducer,
});
const withSaga = injectSaga({ key: 'ExperimentDetailMatPlotPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailMatPlotPage);
