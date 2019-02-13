/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProject = state => state.get('project', initialState);

const makeSelectProjects = () =>
  createSelector(selectProject, projectState => projectState.get('projects'));

const makeSelectModalVisible = () =>
  createSelector(selectProject, projectState =>
    projectState.get('modalVisible'),
  );

export { selectProject, makeSelectProjects, makeSelectModalVisible };
