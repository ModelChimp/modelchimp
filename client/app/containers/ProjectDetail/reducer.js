/*
 *
 * ProjectDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PROJECT_DETAIL,
  LOAD_PROJECT_DETAIL_SUCCESS,
  LOAD_PROJECT_DETAIL_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  projectDetail: {
    name: null,
    description: null,
  },
  projectKey: null
});

function projectDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT_DETAIL:
      return state
        .set('loading', true)
        .set('error', false)
        .set('projectId', action.projectId);
    case LOAD_PROJECT_DETAIL_SUCCESS:

      console.log(action);
      return state
        .set('loading', false)
        .set('error', false)
        .set('projectDetail', action.projectDetail)
        .set('projectKey', action.projectKey);
    case LOAD_PROJECT_DETAIL_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default projectDetailReducer;
