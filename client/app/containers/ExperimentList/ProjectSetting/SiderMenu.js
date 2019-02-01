import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { DETAILS_KEY, MEMBERS_KEY } from './constants';

const Sider = props => (
  <Layout.Sider width={200} style={{ background: '#F0F2F5' }}>
    <Menu
      className={props.className}
      mode="inline"
      defaultSelectedKeys={[DETAILS_KEY]}
      selectedKeys={[props.menuSelected]}
      onClick={props.onClick}
    >
      <Menu.Item key={DETAILS_KEY}>
        <Link to={`${props.url}/details`}>Project Details</Link>
      </Menu.Item>
      <Menu.Item key={MEMBERS_KEY}>
        <Link to={`${props.url}/members`}>Members</Link>
      </Menu.Item>
    </Menu>
  </Layout.Sider>
);

Sider.propTypes = {
  className: PropTypes.string,
  menuSelected: PropTypes.string,
  onClick: PropTypes.string,
  url: PropTypes.string,
};

const StyledSider = styled(Sider)`
  &.ant-menu {
    background: ;
    border: 1px solid grey;
    border-radius: 3px;
  }
`;

export default StyledSider;
