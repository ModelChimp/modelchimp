/*
 *
 * ExperimentDetailParamPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_PARAM,
  LOAD_EXPERIMENT_DETAIL_PARAM_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_PARAM_ERROR
  } from './constants';


export function loadExperimentParamAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_PARAM,
    modelId
  };
}

export function loadExperimentParamSuccessAction(paramData) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_PARAM_SUCCESS,
    paramData
  };
}

export function loadExperimentParamErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_PARAM_ERROR,
    error
  };
}
