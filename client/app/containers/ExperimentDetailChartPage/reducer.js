/*
 *
 * ExperimentDetailChartPage reducer
 *
 */

import { fromJS } from 'immutable';
import {   LOAD_EXPERIMENT_DETAIL_CHART,
            LOAD_EXPERIMENT_DETAIL_CHART_SUCCESS,
            LOAD_EXPERIMENT_DETAIL_CHART_ERROR
    } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  chartData: null,
  });

function experimentDetailChartPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_CHART:
      return state
      .set('modelId', action.modelId)
      .set('loading', true)
      .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_CHART_SUCCESS:
      return state
      .set('chartData', action.chartData)
      .set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_CHART_ERROR:
      return state
      .set('error', action.error)
      .set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailChartPageReducer;
