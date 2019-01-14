/*
 *
 * ExperimentDetailMetricPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  profileData: null,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_PROFILE_SUCCESS:
      return state
            .set('profileData', action.profileData)
            .set('loading', false);
    case LOAD_PROFILE_ERROR:
      return state
              .set('error', action.error)
              .set('loading', false);
    default:
      return state;
  }
}

export default profilePageReducer;
