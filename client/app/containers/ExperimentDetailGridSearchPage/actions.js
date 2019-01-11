/*
 *
 * ExperimentDetailGridSearchPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_GRIDSEARCH,
  LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_ERROR
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
