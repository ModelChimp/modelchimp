/*
 *
 * ExperimentDetailParamPage reducer
 *
 */

import { fromJS } from 'immutable';
import {   LOAD_EXPERIMENT_DETAIL_PARAM,
            LOAD_EXPERIMENT_DETAIL_PARAM_SUCCESS,
            LOAD_EXPERIMENT_DETAIL_PARAM_ERROR
    } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  paramData: null
});

function experimentDetailParamPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_PARAM:
      return state
      .set('modelId', action.modelId)
      .set('loading', true)
      .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_PARAM_SUCCESS:
      return state
      .set('paramData', action.paramData)
      .set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_PARAM_ERROR:
      return state
      .set('error', action.error)
      .set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailParamPageReducer;
