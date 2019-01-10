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
  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_SUCCESS,
    gridsearchData
  };
}

export function loadExperimentGridSearchErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_ERROR,
    error
  };
}
