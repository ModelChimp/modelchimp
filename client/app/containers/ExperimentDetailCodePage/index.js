/**
 *
 * ExperimentDetailCodePage
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
import Highlight from 'react-highlight';
import { makeSelectExperimentDetailCodePage, makeSelectIPythonFlag } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentCodeAction } from './actions';

import CodeStyle from './tomorrow-night-eighties.css';

import { EXPERIMENT_TAB_CODE } from '../ExperimentDetail/constants';
import { onExperimentTabSelect } from '../ExperimentDetail/actions';


/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailCodePage extends React.Component {
  componentDidMount() {
    this.modelId = this.props.match.params.modelId;
    this.columns = [
      {
        title: 'Codeeter',
        dataIndex: 'code',
        key: 'code',
        width: '20vw',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        width: '60vw',
      },
    ];

    this.props.onExperimentTabSelect(EXPERIMENT_TAB_CODE);
    this.props.getExperimentCodeData(this.modelId);
  }

  render() {
    const content = this.props.ipythonFlag ? (
      <p style={{textAlign:'center'}}>Jupyter/Ipython notebooks are not supported</p>
    ): (
      <Highlight className="python">{this.props.codeData}</Highlight>
    );


    return (
      <Section name="Code">
        <link rel="stylesheet" href={CodeStyle} />
        {content}
      </Section>
    );
  }
}

ExperimentDetailCodePage.propTypes = {
  getExperimentCodeData: PropTypes.func.isRequired,
  codeData: PropTypes.string,
  match: PropTypes.object,
  ipythonFlag: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  codeData: makeSelectExperimentDetailCodePage(),
  ipythonFlag : makeSelectIPythonFlag(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentCodeData: modelId =>
      dispatch(loadExperimentCodeAction(modelId)),
    onExperimentTabSelect: tabKey =>
      dispatch(onExperimentTabSelect(tabKey)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'experimentDetailCodePage',
  reducer,
});
const withSaga = injectSaga({ key: 'experimentDetailCodePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetailCodePage);
