/*
 *
 * ExperimentDetailGridSearchPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_GRIDSEARCH,
  LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_ERROR,
  SET_PARAM_COLS,
  SET_METRIC_COLS,
  SET_CHART_FILTERS,
} from './constants';

export function loadExperimentGridSearchAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH,
    modelId,
  };
}

export function loadExperimentGridSearchSuccessAction(gridsearchData) {
  const paramColumns = [];
  const metricColumns = [];
  for (let i = 0; i < gridsearchData.columns.length; i += 1) {
    if (gridsearchData.columns[i].includes('param')) {
      paramColumns.push(gridsearchData.columns[i]);
    } else {
      metricColumns.push(gridsearchData.columns[i]);
    }
  }

  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_SUCCESS,
    gridsearchData,
    paramColumns,
    metricColumns,
  };
}

export function loadExperimentGridSearchErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_ERROR,
    error,
  };
}

export function setParamColsAction(paramCols) {
  return {
    type: SET_PARAM_COLS,
    paramCols,
  };
}

export function setMetricColsAction(metricCols) {
  return {
    type: SET_METRIC_COLS,
    metricCols,
  };
}

export function setFilterAction(filter) {
  return {
    type: SET_CHART_FILTERS,
    filter,
  };
}
