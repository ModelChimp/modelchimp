import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from './logo.png';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <Layout.Header style={{ position: 'fixed', zIndex: 300, width: '100vw' }}>
        <img src={Logo} style={{ height: '30px' }} alt="" />

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['']}
          style={{ lineHeight: '64px', float: 'right' }}
        >
          <Menu.Item key="1">
            <Link to="/projects">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="https://docs.modelchimp.com" target="_">
              Docs
            </a>
          </Menu.Item>

          <Menu.SubMenu title={<Avatar src={this.props.avatar} />}>
            <Menu.Item key="profile">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string,
};

export default Header;

// https://docs.modelchimp.com/logo.png
// <div className="logo" />
