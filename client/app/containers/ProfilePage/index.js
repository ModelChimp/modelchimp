/**
 *
 * ExperimentDetailMetricPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProfile from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadProfileAction } from './actions';

import HeaderWrapper from 'containers/HeaderWrapper';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import Content from 'components/Content';

/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    console.log("hello");
  }

  componentDidMount() {
    console.log("in mount");
//    this.props.getExperimentMetricData(this.modelId);
  }

  render() {
    console.log("its here");
    return (
      <Layout className="layout">
        <Helmet>
          <title>Profile</title>
          <meta name="description" content="Profile Page" />
        </Helmet>
        <HeaderWrapper />

        <Content>
          <div style={{ marginTop: '50px' }}>
            some content
          </div>
        </Content>
      </Layout>    );
  }
}

ProfilePage.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  profileData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profileData: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadProfile: () =>
      dispatch(loadProfileAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'profilePage',
  reducer,
});
const withSaga = injectSaga({ key: 'profilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
