/*
 *
 * ExperimentDetailChartPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_CHART,
  LOAD_EXPERIMENT_DETAIL_CHART_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_CHART_ERROR
  } from './constants';


export function loadExperimentChartAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_CHART,
    modelId
  };
}

export function loadExperimentChartSuccessAction(chartData) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_CHART_SUCCESS,
    chartData
  };
}

export function loadExperimentChartErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_CHART_ERROR,
    error
  };
}
