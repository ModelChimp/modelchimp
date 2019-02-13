/**
 *
 * ProjectSetting
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout } from 'antd';
import { makeSelectProjectDetail } from 'containers/ProjectDetail/selectors';
import { makeSelectInvite } from './selectors';
import { setMenuKey } from './actions';
import { MEMBERS_KEY } from './constants';
import InviteForm from './InviteForm';
import Member from './Member';
/*
* Main component
*/
export class Members extends React.Component {
  componentDidMount() {
    this.props.dispatch(setMenuKey(MEMBERS_KEY));
  }

  render() {
    const { members } = this.props.projectDetail;
    const projectId = this.props.match.params.id;

    return members ? (
      <Layout>
        <InviteForm
          style={{ marginBottom: '30px' }}
          projectId={projectId}
          dispatch={this.props.dispatch}
          inviteFlag={this.props.inviteFlag}
        />
        {members.map(e => (
          <Member
            key={e.id}
            firstName={e.first_name}
            lastName={e.last_name}
            profilePic={e.avatar}
          />
        ))}
      </Layout>
    ) : (
      <div>No Members</div>
    );
  }
}

Members.propTypes = {
  dispatch: PropTypes.func.isRequired,
  projectDetail: PropTypes.object,
  match: PropTypes.object,
  inviteFlag: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  projectDetail: makeSelectProjectDetail(),
  inviteFlag: makeSelectInvite(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
