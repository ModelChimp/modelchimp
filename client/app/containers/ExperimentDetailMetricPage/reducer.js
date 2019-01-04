/*
 *
 * ExperimentDetailMetricPage reducer
 *
 */

import { fromJS } from 'immutable';
import {   LOAD_EXPERIMENT_DETAIL_METRIC,
            LOAD_EXPERIMENT_DETAIL_METRIC_SUCCESS,
            LOAD_EXPERIMENT_DETAIL_METRIC_ERROR
    } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  metricData: null  
});

function experimentDetailMetricPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_METRIC:
      return state
      .set('modelId', action.modelId)
      .set('loading', true)
      .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_METRIC_SUCCESS:
      return state
      .set('metricData', action.metricData)
      .set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_METRIC_ERROR:
      return state
      .set('error', action.error)
      .set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailMetricPageReducer;
