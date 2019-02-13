/*
 *
 * ProjectDetail reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_PROJECT_DETAILS_SUCCESS } from 'containers/ExperimentList/ProjectSetting/constants';
import { LOAD_PROJECT_DETAIL, LOAD_PROJECT_DETAIL_SUCCESS } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  projectDetail: {
    name: null,
    description: null,
    members: null,
  },
  projectKey: null,
});

function projectDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT_DETAIL:
      return state
        .set('loading', true)
        .set('error', false)
        .set('projectId', action.projectId);
    case LOAD_PROJECT_DETAIL_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('projectDetail', action.projectDetail)
        .set('projectKey', action.projectKey);
    case UPDATE_PROJECT_DETAILS_SUCCESS:
      return state.set('projectDetail', action.projectData);
    default:
      return state;
  }
}

export default projectDetailReducer;
