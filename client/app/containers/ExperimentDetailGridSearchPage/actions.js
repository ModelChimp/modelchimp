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
  } from './constants';


export function loadExperimentGridSearchAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH,
    modelId
  };
}

export function loadExperimentGridSearchSuccessAction(gridsearchData) {
  let paramColumns = [];
  let metricColumns = [];
  for(var i = 0; i < gridsearchData.columns.length; i++){
    if(gridsearchData.columns[i].includes('param')){
      paramColumns.push(gridsearchData.columns[i]);
    } else {
      metricColumns.push(gridsearchData.columns[i]);
    }
  }

  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_SUCCESS,
    gridsearchData,
    paramColumns,
    metricColumns
  };
}

export function loadExperimentGridSearchErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_ERROR,
    error
  };
}

export function setParamColsAction(paramCols) {
  return {
    type: SET_PARAM_COLS,
    paramCols
  };
}

export function setMetricColsAction(metricCols) {
  return {
    type: SET_METRIC_COLS,
    metricCols
  };
}
