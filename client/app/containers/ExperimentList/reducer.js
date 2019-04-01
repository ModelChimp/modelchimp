/*
 *
 * ExperimentList reducer
 *
 */

import { fromJS, Set } from 'immutable';
import {
  GET_DATA,
  LOAD_EXPERIMENT_DATA,
  LOAD_EXPERIMENT_DATA_SUCCESS,
  LOAD_EXPERIMENT_DATA_ERROR,
  SET_EXPERIMENT_COLUMNS,
  ADD_DELETE_EXPERIMENT_ID,
  REMOVE_DELETE_EXPERIMENT_ID,
  CLEAR_DELETE_EXPERIMENTS,
  SUBMIT_DELETE_EXPERIMENTS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  projectId: null,
  experiments: null,
  columns: {
    projectId: null,
    list: null,
    metricList: null,
  },
  deleteList: Set(),
});

function experimentListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return state.set('loading', true);
    case LOAD_EXPERIMENT_DATA:
      return state.set('error', false).set('projectId', action.projectId);
    case LOAD_EXPERIMENT_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('experiments', action.experiments);
    case LOAD_EXPERIMENT_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    case SET_EXPERIMENT_COLUMNS:
      return state
        .set('loading', true)
        .setIn(['columns', 'projectId'], action.projectId)
        .setIn(['columns', 'list'], action.columnList)
        .setIn(['columns', 'metricList'], action.metricColumnList);
    case ADD_DELETE_EXPERIMENT_ID:
      return state.set('deleteList', state.get('deleteList').add(action.eid));
    case REMOVE_DELETE_EXPERIMENT_ID:
      return state.set('deleteList', state.get('deleteList').delete(action.eid));
    case CLEAR_DELETE_EXPERIMENTS:
      return state.set('deleteList', Set());
    default:
      return state;
  }
}

export default experimentListReducer;
