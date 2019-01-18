import React from 'react';
import styled from 'styled-components';

import { Menu, Icon, Layout } from 'antd';
import { DETAILS_KEY, MEMBERS_KEY } from './constants';
import { Link } from 'react-router-dom';

class Sider extends React.Component {


  render() {
    return (
      <Layout.Sider width={200} style={{ background: '#F0F2F5' }}>
        <Menu
          className={this.props.className}
          mode="inline"
          defaultSelectedKeys={[DETAILS_KEY]}
          selectedKeys={[this.props.menuSelected]}
          onClick={this.props.onClick}
        >
            <Menu.Item key={DETAILS_KEY}>
              <Link to={`${this.props.url}/details`}>Project Details</Link>
            </Menu.Item>
            <Menu.Item key={MEMBERS_KEY}>
              <Link to={`${this.props.url}/members`}>Members</Link>
            </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

const StyledSider = styled(Sider)`
  &.ant-menu {
    background:;
    border: 1px solid grey;
    border-radius: 3px;
  }
`;

export default StyledSider;
