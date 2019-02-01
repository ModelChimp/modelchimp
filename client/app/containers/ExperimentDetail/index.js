import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import HeaderWrapper from 'containers/HeaderWrapper';
import { Layout, Menu, Breadcrumb } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IdBlock from 'components/IdBlock';
import Content from 'components/Content';
import { Route, Link } from 'react-router-dom';

import ExperimentDetailMetricPage from 'containers/ExperimentDetailMetricPage/Loadable';
import ExperimentDetailParamPage from 'containers/ExperimentDetailParamPage/Loadable';
import ExperimentDetailCodePage from 'containers/ExperimentDetailCodePage/Loadable';
import ExperimentDetailChartPage from 'containers/ExperimentDetailChartPage/Loadable';
import ExperimentDetailObjectPage from 'containers/ExperimentDetailObjectPage/Loadable';
import ExperimentDetailGridSearchPage from 'containers/ExperimentDetailGridSearchPage/Loadable';
import { loadExperimentDetailAction } from './actions';
import {
  makeSelectExperimentDetail,
  makeSelectExperimentId,
  makeSelectShortExperimentId,
  makeSelectExperimentName,
  makeSelectLabels,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import Label from './Label';

const { Sider } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetail extends React.Component {
  state = {
    selectedKey: '1',
  };

  componentDidMount() {
    const { modelId } = this.props.match.params;

    this.props.getExperimentMetaData(modelId);
  }

  onMenuSelect = ({ key }) => {
    this.setState({
      selectedKey: key,
    });
  };

  render() {
    return (
      <Layout>
        <Helmet>
          <title>ExperimentDetail</title>
          <meta name="description" content="Description of ExperimentDetail" />
        </Helmet>
        <HeaderWrapper />
        <Layout>
          <Sider
            width={200}
            style={{
              background: '#fff',
              position: 'fixed',
              marginTop: 64,
              zIndex: 200,
              height: '100vh',
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              selectedKeys={[this.state.selectedKey]}
              onClick={this.onMenuSelect}
            >
              <Menu.Item key="1">
                <Link to={`${this.props.match.url}`}>
                  <FontAwesomeIcon icon="greater-than-equal" /> Metrics
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={`${this.props.match.url}/param`}>
                  <FontAwesomeIcon icon="list-ol" /> Parameters
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={`${this.props.match.url}/code`}>
                  <FontAwesomeIcon icon="file-code" /> Code
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={`${this.props.match.url}/chart`}>
                  <FontAwesomeIcon icon="chart-line" /> Charts
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to={`${this.props.match.url}/object`}>
                  <FontAwesomeIcon icon="database" /> Objects
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to={`${this.props.match.url}/gridsearch`}>
                  <FontAwesomeIcon icon="grip-horizontal" /> Grid Search
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ marginLeft: 200 }}>
            <h1 />

            <div style={{ marginTop: '50px' }}>
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <Link to="/projects">Projects</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link
                    to={`/experiment-list/${this.props.experiment.project}`}
                  >
                    {this.props.experiment.project_name}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/experiment-detail/${this.props.experiment.id}`}>
                    {this.props.experimentName}
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ marginTop: '20px' }}>
                <h2>Experiment Name: {this.props.experimentName}</h2>
                <IdBlock
                  copy={this.props.experimentId}
                  display={this.props.shortExperimentId}
                />
                <Label
                  style={{ marginTop: '20px' }}
                  labels={this.props.labels}
                />

                <Route
                  exact
                  path={`${this.props.match.path}`}
                  component={ExperimentDetailMetricPage}
                />
                <Route
                  path={`${this.props.match.path}/param`}
                  component={ExperimentDetailParamPage}
                />
                <Route
                  path={`${this.props.match.path}/code`}
                  component={ExperimentDetailCodePage}
                />
                <Route
                  path={`${this.props.match.path}/chart`}
                  component={ExperimentDetailChartPage}
                />
                <Route
                  path={`${this.props.match.path}/object`}
                  component={ExperimentDetailObjectPage}
                />
                <Route
                  path={`${this.props.match.path}/gridsearch`}
                  component={ExperimentDetailGridSearchPage}
                />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

ExperimentDetail.propTypes = {
  experiment: PropTypes.object,
  match: PropTypes.object,
  getExperimentMetaData: PropTypes.func,
  experimentName: PropTypes.string,
  experimentId: PropTypes.string,
  modelId: PropTypes.string,
  shortExperimentId: PropTypes.string,
  labels: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  experiment: makeSelectExperimentDetail(),
  experimentId: makeSelectExperimentId(),
  shortExperimentId: makeSelectShortExperimentId(),
  experimentName: makeSelectExperimentName(),
  labels: makeSelectLabels(),
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

const withReducer = injectReducer({ key: 'experimentDetail', reducer });
const withSaga = injectSaga({ key: 'experimentDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentDetail);
