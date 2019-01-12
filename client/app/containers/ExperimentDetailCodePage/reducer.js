/*
 *
 * ExperimentDetailCodePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_EXPERIMENT_DETAIL_CODE,
  LOAD_EXPERIMENT_DETAIL_CODE_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_CODE_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  codeData: null,
});

function experimentDetailCodePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_CODE:
      return state
        .set('modelId', action.modelId)
        .set('loading', true)
        .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_CODE_SUCCESS:
      return state.set('codeData', action.codeData).set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_CODE_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailCodePageReducer;
