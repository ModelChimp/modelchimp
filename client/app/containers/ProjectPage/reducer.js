/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  LOAD_PROJECT_DATA,
  LOAD_PROJECT_DATA_SUCCESS,
  LOAD_PROJECT_DATA_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({});

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT_DATA:
      return state.set('loading', true).set('error', false);
    case LOAD_PROJECT_DATA_SUCCESS:
      return state.set('projects', action.projects).set('loading', false);
    case LOAD_PROJECT_DATA_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default projectReducer;
