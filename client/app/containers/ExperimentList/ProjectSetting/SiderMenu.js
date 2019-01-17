import React from 'react';
import styled from 'styled-components';

import { Menu, Icon, Layout } from 'antd';

class Sider extends React.Component {
  // submenu keys of first level

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    return (
      <Layout.Sider width={200} style={{ background: '#fff' }}>
        <Menu
          className={this.props.className}
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ height: '100%'}}
        >
            <Menu.Item key="1">Project Details</Menu.Item>
            <Menu.Item key="2">Members</Menu.Item>
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
