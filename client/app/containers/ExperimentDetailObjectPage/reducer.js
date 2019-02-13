/*
 *
 * ExperimentDetailObjectPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_EXPERIMENT_DETAIL_OBJECT,
  LOAD_EXPERIMENT_DETAIL_OBJECT_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_OBJECT_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  objectData: null,
});

function experimentDetailObjectPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_OBJECT:
      return state
        .set('modelId', action.modelId)
        .set('loading', true)
        .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_OBJECT_SUCCESS:
      return state.set('objectData', action.objectData).set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_OBJECT_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailObjectPageReducer;
