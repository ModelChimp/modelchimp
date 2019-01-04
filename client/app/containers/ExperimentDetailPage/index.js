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
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExpIdBlock from 'components/ExpIdBlock';
import Content from 'components/Content';



import {loadExperimentDetailAction} from './actions';

const { SubMenu } = Menu;
const {  Sider } = Layout;
/* eslint-disable react/prefer-stateless-function */
export class ExperimentDetailPage extends React.Component {
  componentDidMount() {
    const modelId = this.props.match.params.modelId;
    this.props.getExperimentMetaData(modelId);
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>ExperimentDetail</title>
          <meta name="description" content="Description of ExperimentDetail" />
        </Helmet>
        <Header />
          <Layout>
          <Sider width={200} style={{ background: '#fff', position:'fixed',marginTop:64, zIndex:200, height:'100vh' }}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                  >
                    <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                      <Menu.Item key="1">option1</Menu.Item>
                      <Menu.Item key="2">option2</Menu.Item>
                      <Menu.Item key="3">option3</Menu.Item>
                      <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                      <Menu.Item key="5">option5</Menu.Item>
                      <Menu.Item key="6">option6</Menu.Item>
                      <Menu.Item key="7">option7</Menu.Item>
                      <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                      <Menu.Item key="9">option9</Menu.Item>
                      <Menu.Item key="10">option10</Menu.Item>
                      <Menu.Item key="11">option11</Menu.Item>
                      <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                  </Menu>
                </Sider>
        <Content style={{marginLeft:200}}>
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
        </Content>
      </Layout>

      </Layout>
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
