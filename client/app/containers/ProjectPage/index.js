/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoading } from 'containers/App/selectors';
import Header from 'components/Header';

import styled from 'styled-components';
import Section from './Section';
import { loadProjectData } from './actions';
import { makeSelectProjects } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ProjectList from './ProjectList';

const TopPaddedDiv = styled.div`
  padding-top: 50px;
`;

export class ProjectPage extends React.PureComponent {
  componentDidMount() {
    this.props.getProjectData();
  }

  render() {
    const { projects } = this.props;

    return (
      <div>
        <Header />
        <article>
          <Helmet>
            <title>Project Page</title>
            <meta name="description" content="PROJECT PAGE" />
          </Helmet>

          <TopPaddedDiv>
            <Section>
              <ProjectList projects={projects} />
            </Section>
          </TopPaddedDiv>
        </article>
      </div>
    );
  }
}

ProjectPage.propTypes = {
  projects: PropTypes.array,
  getProjectData: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getProjectData: () => dispatch(loadProjectData()),
  };
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  loading: makeSelectLoading(),
  projects: makeSelectProjects(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'project', reducer });
const withSaga = injectSaga({ key: 'project', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectPage);