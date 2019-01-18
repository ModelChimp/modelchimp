/**
 *
 * ExperimentList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Layout } from 'antd';
import ProjectDetail from 'containers/ProjectDetail/Loadable';
import HeaderWrapper from 'containers/HeaderWrapper';
import Content from 'components/Content';
import { Route } from 'react-router-dom';
import reducer from './reducer';
import saga from './saga';
import ExperimentMenu from './ExperimentMenu/index';
import ProjectSetting from './ProjectSetting';
import ExperimentTable from './ExperimentTable';

export class ExperimentList extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Helmet>
          <title>ExperimentList</title>
          <meta name="description" content="Description of ExperimentList" />
        </Helmet>
        <HeaderWrapper />

        <Content>
          <div style={{ marginTop: '50px' }}>
            <ProjectDetail projectId={this.props.match.params.id} />
          </div>
          <ExperimentMenu
            style={{ marginTop: '50px', background: '#F0F2F5' }}
            projectId={this.props.match.params.id}
            url={this.props.match.url}
          />
        <Route path={`${this.props.match.path}/settings`} component={ProjectSetting} />
        <Route exact path={`${this.props.match.path}`} component={ExperimentTable} />
        </Content>
      </Layout>
    );
  }
}

ExperimentList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'experimentList', reducer });
const withSaga = injectSaga({ key: 'experimentList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentList);
