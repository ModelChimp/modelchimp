/**
 * ProjectList
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { Link } from 'react-router-dom';

class ProjectList extends React.PureComponent {
  render() {
    const { projects } = this.props;

    return (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={projects}
        style={this.props.style}
        renderItem={item => (
          <Link to={`/experiment-list/${item.id}`} style={{ color: 'inherit' }}>
            <List.Item style={{borderBottom:'1px solid grey'}}>
              <List.Item.Meta
                title={item.name}
                description={item.description}
              />
              <div style={{ flexDirection: 'row', textAlign: 'right' }}>
                <div style={{ alignSelf: 'flex-end' }}>
                  <b> Submit Count:</b> {item.submission_count}
                </div>
                <div>
                  <b>Submitted on:</b> {item.last_submitted}
                </div>
              </div>
            </List.Item>
          </Link>
        )}
      />
    );
  }
}

ProjectList.propTypes = {
  projects: PropTypes.array,
  style: PropTypes.object,
};

export default ProjectList;
