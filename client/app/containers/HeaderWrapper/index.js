/**
 *
 * HeaderWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Header from 'components/Header';
import makeSelectHeaderWrapper from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadHeader } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class HeaderWrapper extends React.PureComponent {
  componentDidMount() {
    this.props.getAvatar();
  }

  render() {
    return <Header avatar={this.props.avatar} />;
  }
}

HeaderWrapper.propTypes = {
  getAvatar: PropTypes.func.isRequired,
  avatar: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  avatar: makeSelectHeaderWrapper(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAvatar: () => dispatch(loadHeader()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'headerWrapper', reducer });
const withSaga = injectSaga({ key: 'headerWrapper', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HeaderWrapper);
