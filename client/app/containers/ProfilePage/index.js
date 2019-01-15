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
import {makeSelectProfile} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadProfileAction, updateProfileAction } from './actions';

import HeaderWrapper from 'containers/HeaderWrapper';
import { Layout, Avatar } from 'antd';
import { Helmet } from 'react-helmet';
import ContentCentered from 'components/ContentCentered';
import { Row, Col } from 'antd';
import ModelchimpClient from 'utils/modelchimpClient';
import Section from 'components/Section';
import EditProfile from './EditProfile';


/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
   this.props.loadProfile();
  }

  render() {
    return (
      <Layout className="layout">
        <Helmet>
          <title>Profile</title>
          <meta name="description" content="Profile Page" />
        </Helmet>
        <HeaderWrapper />

        <ContentCentered>
          <div style={{ marginTop: '150px', width:'50vw',textAlign:'center' }}>
            <h2>Profile</h2>
            <Row>
                <Col xs={{ span: 10 }} lg={{ span: 12 }}>
                  <Avatar src={this.props.profileData.avatar} size={300} />
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 8, offset: 4 }} >
                  <Section name="First Name" h3={true}>
                    <span>{this.props.profileData.first_name}</span>
                  </Section>
                  <Section name="Last Name" h3={true}>
                    <span>{this.props.profileData.last_name}</span>
                  </Section>
                </Col>
            </Row>
            <EditProfile updateFunc={this.props.updateProfile} data={this.props.profileData} />

          </div>
        </ContentCentered>
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
    updateProfile: (values) =>
      dispatch(updateProfileAction(values)),
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
