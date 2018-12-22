/**
 *
 * ProjectDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProjectDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadProjectDetailAction } from './actions';

export class ProjectDetail extends React.Component {
  componentDidMount() {
    this.props.getProjectDetailData(this.props.projectId);
  }

  render() {
    return (
      <div>
        <h1>{this.props.projectDetail.name}</h1>
        <p>{this.props.projectDetail.description}</p>
      </div>
    );
  }
}

ProjectDetail.propTypes = {
  projectDetail: PropTypes.object,
  getProjectDetailData: PropTypes.func,
  projectId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  projectDetail: makeSelectProjectDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProjectDetailData: projectId =>
      dispatch(loadProjectDetailAction(projectId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectDetail', reducer });
const withSaga = injectSaga({ key: 'projectDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectDetail);
