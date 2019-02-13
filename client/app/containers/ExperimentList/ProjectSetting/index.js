/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ContentCentered from 'components/ContentCentered';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import { makeSelectMenuKey } from './selectors';
import reducer from './reducer';
import saga from './saga';

import SiderMenu from './SiderMenu';
import Detail from './Detail';
import { setMenuKey } from './actions';
import Members from './Members';
import { onMenuSelectionAction } from '../ExperimentMenu/actions';
import { MENU_SETTING } from '../ExperimentMenu/constants';

/* eslint-disable react/prefer-stateless-function */
export class ProjectSetting extends React.Component {
  componentDidMount() {
    this.props.dispatch(onMenuSelectionAction(MENU_SETTING));
  }

  onMenuClick = ({ key }) => {
    this.props.dispatch(setMenuKey(key));
  };

  render() {
    return (
      <ContentCentered style={{ width: '60vw', marginTop: '40px' }}>
        <Layout>
          <SiderMenu
            onClick={this.onMenuClick}
            url={this.props.match.url}
            menuSelected={this.props.menuSelected}
          />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Layout.Content>
              <Route
                path={`${this.props.match.path}/details`}
                component={Detail}
              />
              <Route
                path={`${this.props.match.path}/members`}
                component={Members}
              />
            </Layout.Content>
          </Layout>
        </Layout>
      </ContentCentered>
    );
  }
}

ProjectSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  menuSelected: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  menuSelected: makeSelectMenuKey(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectSetting', reducer });
const withSaga = injectSaga({ key: 'projectSetting', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectSetting);
