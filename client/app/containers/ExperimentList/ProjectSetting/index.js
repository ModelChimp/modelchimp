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
import {makeSelectUpdateFlag} from './selectors';
import reducer from './reducer';
import saga from './saga';

import SiderMenu from './SiderMenu';
import ContentCentered from 'components/ContentCentered';
import { Layout } from 'antd'
import Detail from './Detail';
import { setMenuKey } from './actions';
import { Route } from 'react-router-dom';
import Members from './Members';
/* eslint-disable react/prefer-stateless-function */
export class ProjectSetting extends React.Component {
  onMenuClick = ({key}) => {
    this.props.dispatch(setMenuKey(key));
  }


  render() {
    return <ContentCentered style={{width:'60vw', marginTop:'40px'}}>
            <Layout>
              <SiderMenu onClick={this.onMenuClick} url={this.props.match.url}>
                  Some Content
              </SiderMenu>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Layout.Content>
                    <Route exact path={`${this.props.match.path}`} component={Detail} />
                    <Route  path={`${this.props.match.path}/details`} component={Detail} />
                    <Route  path={`${this.props.match.path}/members`} component={Members} />
                </Layout.Content>
              </Layout>
            </Layout>
          </ContentCentered>;
  }
}

ProjectSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // projectSetting: makeSelectProjectSetting(),
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
