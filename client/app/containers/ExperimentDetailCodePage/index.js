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
import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import Section from 'components/Section';
import Highlight from 'react-highlight';
import makeSelectExperimentDetailCodePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadExperimentCodeAction } from './actions';

import CodeStyle from './tomorrow-night-eighties.css';

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
    this.props.getExperimentCodeData(this.modelId);
  }

  render() {
    return (
        <Section name="Code">
          <link rel="stylesheet" href={CodeStyle} />

          <Highlight className="python">{this.props.codeData}</Highlight>
        </Section>
    );
  }
}

ExperimentDetailCodePage.propTypes = {
  getExperimentCodeData: PropTypes.func.isRequired,
  codeData: PropTypes.string,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  codeData: makeSelectExperimentDetailCodePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentCodeData: modelId =>
      dispatch(loadExperimentCodeAction(modelId)),
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
