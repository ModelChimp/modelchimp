import { fromJS } from 'immutable';
import CookiesManager from 'utils/cookiesManager';


import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from './constants';

import {
  LOAD_EXPERIMENT_DATA,
  LOAD_EXPERIMENT_DATA_SUCCESS,
} from 'containers/ExperimentList/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  auth: {
    token: CookiesManager.getAuthToken('token'),
    logged: !!CookiesManager.getAuthToken('token'),
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOGIN_SUCCESS:
      return state
        .set('error', false)
        .setIn(['auth', 'token'], action.token)
        .setIn(['auth', 'logged'], true);
    case LOGIN_ERROR:
      return state.set('error', action.error).setIn(['auth', 'logged'], false);
    case LOGOUT:
      return state
        .setIn(['auth', 'token'], null)
        .setIn(['auth', 'logged'], false);
    case LOAD_EXPERIMENT_DATA:
      return state.set('loading', true);
    case LOAD_EXPERIMENT_DATA_SUCCESS:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
