/*
 *
 * ExperimentList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_EXPERIMENT_DATA,
  LOAD_EXPERIMENT_DATA_SUCCESS,
  LOAD_EXPERIMENT_DATA_ERROR,
  SET_EXPERIMENT_COLUMNS
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  experimentId: null,
  experiments: null,
  columns: null
});

function experimentListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('experimentId', action.experimentId)
    case LOAD_EXPERIMENT_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('experiments', action.experiments);
    case LOAD_EXPERIMENT_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    case SET_EXPERIMENT_COLUMNS:
      return state
        .set('columns', action.columns)
    default:
      return state;
  }
}

export default experimentListReducer;
