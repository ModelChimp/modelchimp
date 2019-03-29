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
import ExperimentDetailAssetPage from 'containers/ExperimentDetailAssetPage/Loadable';

import {
  EXPERIMENT_TAB_METRICS,
  EXPERIMENT_TAB_PARAMETERS,
  EXPERIMENT_TAB_CODE,
  EXPERIMENT_TAB_CHARTS,
  EXPERIMENT_TAB_OBJECTS,
  EXPERIMENT_TAB_GRIDSEARCH,
  EXPERIMENT_TAB_ASSET,
} from './constants';

import { loadExperimentDetailAction,
          onExperimentTabSelect,
          deleteExperimentLabelsAction,
          createExperimentLabelsAction } from './actions';
import {
  makeSelectExperimentDetail,
  makeSelectExperimentId,
  makeSelectShortExperimentId,
  makeSelectExperimentName,
  makeSelectLabels,
  makeSelectTab,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import Label from 'components/Label/Loadable';

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
    this.props.onExperimentTabSelect(key);
  };

  onLabelDelete = (label, modelId) => {
    this.props.deleteExperimentLabelsAction(modelId, label);
  }

  onLabelSubmit = (modelId, values) => {
    this.props.createExperimentLabelsAction(modelId, values);
  }


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
              style={{ height: '100%', borderRight: 0 }}
              selectedKeys={[this.props.tabKey]}
              onClick={this.onMenuSelect}
            >
              <Menu.Item key={EXPERIMENT_TAB_METRICS}>
                <Link to={`${this.props.match.url}`}>
                  <FontAwesomeIcon icon="greater-than-equal" /> Metrics
                </Link>
              </Menu.Item>
              <Menu.Item key={EXPERIMENT_TAB_PARAMETERS}>
                <Link to={`${this.props.match.url}/param`}>
                  <FontAwesomeIcon icon="list-ol" /> Parameters
                </Link>
              </Menu.Item>
              <Menu.Item key={EXPERIMENT_TAB_CODE}>
                <Link to={`${this.props.match.url}/code`}>
                  <FontAwesomeIcon icon="code" /> Code
                </Link>
              </Menu.Item>
              <Menu.Item key={EXPERIMENT_TAB_CHARTS}>
                <Link to={`${this.props.match.url}/chart`}>
                  <FontAwesomeIcon icon="chart-line" /> Charts
                </Link>
              </Menu.Item>
              <Menu.Item key={EXPERIMENT_TAB_OBJECTS}>
                <Link to={`${this.props.match.url}/object`}>
                  <FontAwesomeIcon icon="database" /> Objects
                </Link>
              </Menu.Item>
              <Menu.Item key={EXPERIMENT_TAB_GRIDSEARCH}>
                <Link to={`${this.props.match.url}/gridsearch`}>
                  <FontAwesomeIcon icon="grip-horizontal" /> Grid Search
                </Link>
              </Menu.Item>
              <Menu.Item key={EXPERIMENT_TAB_ASSET}>
                <Link to={`${this.props.match.url}/asset`}>
                  <FontAwesomeIcon icon="file" /> Asset
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
                  buttonDisplay={true}
                  modelId={this.props.experiment.id}
                  labelData={this.props.labels}
                  onLabelDelete={this.onLabelDelete}
                  onLabelSubmit={this.onLabelSubmit}
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
                <Route
                  path={`${this.props.match.path}/asset`}
                  component={ExperimentDetailAssetPage}
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
  tabKey: makeSelectTab(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentMetaData: modelId =>
      dispatch(loadExperimentDetailAction(modelId)),
    onExperimentTabSelect: tabKey =>
      dispatch(onExperimentTabSelect(tabKey)),
    deleteExperimentLabelsAction: (modelId, label) =>
      dispatch(deleteExperimentLabelsAction(modelId, label)),
    createExperimentLabelsAction: (modelId, values) =>
      dispatch(createExperimentLabelsAction(modelId, values)),
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
