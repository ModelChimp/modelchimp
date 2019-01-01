import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectExperimentDetail,
        makeSelectExperimentId,
        makeSelectShortExperimentId,
        makeSelectExperimentName
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from 'components/Header';
import { Breadcrumb } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExpIdBlock from 'components/ExpIdBlock';

import {loadExperimentDetailAction} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailPage extends React.Component {
  componentDidMount() {
    const modelId = this.props.match.params.modelId;
    this.props.getExperimentMetaData(modelId);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ExperimentDetail</title>
          <meta name="description" content="Description of ExperimentDetail" />
        </Helmet>
        <Header />

        <h1></h1>
        <div style={{marginTop:"50px"}}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item><a href="/projects">Projects</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href={`/experiment-list/${this.props.experiment.project}`}>{this.props.experiment.project_name}</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href={`/experiment-detail/${this.props.experiment.id}`}>{this.props.experimentName}</a></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{marginTop:"20px"}}>
            <h2 style={{display:"inline"}}>Experiment Name: {this.props.experimentName}</h2>
            <ExpIdBlock expId={this.props.experimentId} sExpId={this.props.shortExperimentId} style={{float:"right"}} />
          </div>
        </div>
      </div>
    );
  }
}

ExperimentDetailPage.propTypes = {
  experiment: PropTypes.object,
  getExperimentMetaData: PropTypes.func,
  experimentName: PropTypes.string,
  experimentId: PropTypes.string,
  experimentShortId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  experiment: makeSelectExperimentDetail(),
  experimentId: makeSelectExperimentId(),
  shortExperimentId: makeSelectShortExperimentId(),
  experimentName: makeSelectExperimentName()
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentMetaData: modelId =>
      dispatch(loadExperimentDetailAction(modelId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'experimentDetailPage', reducer });
const withSaga = injectSaga({ key: 'experimentDetailPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailPage);
