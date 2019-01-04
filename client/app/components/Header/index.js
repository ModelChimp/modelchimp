import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import { Layout, Menu, Icon, Avatar } from 'antd';
import Logo from './logo.png';
import { Link } from "react-router-dom";

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <Layout.Header style={{position:'fixed', zIndex:300, width:'100vw' }}>
        <img src={Logo} style={{height:'30px'}} />

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['']}
          style={{ lineHeight: '64px', float:'right'}}
        >
          <Menu.Item key="1">
            <Link to='/projects'>Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <a href='https://docs.modelchimp.com' target="_">Docs</a>
          </Menu.Item>

          <Menu.SubMenu title={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
            <Menu.Item key="setting:1">Profile</Menu.Item>
            <Menu.Item key="setting:2">
              <Link to='/logout'>Logout</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    );
  }
}

export default Header;

//https://docs.modelchimp.com/logo.png
//<div className="logo" />
