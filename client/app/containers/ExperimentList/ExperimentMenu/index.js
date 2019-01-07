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
import makeSelectExperimentMenuMetricPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import {loadExperimentMetricAction} from './actions';

import Section from 'components/Section';
import { Modal, Menu, Icon, Button, Transfer } from 'antd';
import {loadMenuParameterAction} from './actions';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class ExperimentMenu extends React.Component {
  state = {
    current: 'mail',
    visible: false,
    mockData: [],
    targetKeys: [],
    paramData: []
  }

  componentDidMount() {
    let projectId = this.props.projectId;
    this.props.getExperimentMenuParameterData(projectId);

    // this.getMock();
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  }

  parseData = (data) => {
    const paramData = [];

    for (let i = 0; i < data.length; i++) {
      const result = {
        key: i.toString(),
        title: data[i].parameter,
        description: data[i].parameter,
        chosen: Math.random() * 2 > 1,
      };

      paramData.push(result);
    }

    return paramData;
  }

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  render() {
    return (
      <Menu
        className = {this.props.className}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        style={this.props.style}
      >
        <Menu.Item key="experiments">
          <Icon type="bars" />Experiments
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" /> Setting
        </Menu.Item>

        <Menu.Item key="customize-table" style={{float:"right"}}>
          <Button type="primary"  onClick={this.showModal}>
            <span>Customize Table</span>
          </Button>
          <Modal
            title="Members"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          <Transfer
             dataSource={this.props.menuParam}
             targetKeys={this.state.targetKeys}
             onChange={this.handleChange}
             onSearch={this.handleSearch}
             render={item => item.title}
           />
          </Modal>
        </Menu.Item>
      </Menu>
    );
  }
}


ExperimentMenu.propTypes = {
  getExperimentMenuParameterData: PropTypes.func.isRequired,
  menuParam: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  menuParam: makeSelectExperimentMenuMetricPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getExperimentMenuParameterData: projectId => dispatch(loadMenuParameterAction(projectId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'experimentMenuParameter', reducer });
const withSaga = injectSaga({ key: 'experimentMenuParameter', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExperimentMenu);
