/*
 *
 * ExperimentDetailCodePage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_CODE,
  LOAD_EXPERIMENT_DETAIL_CODE_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_CODE_ERROR,
} from './constants';

export function loadExperimentCodeAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_CODE,
    modelId,
  };
}

export function loadExperimentCodeSuccessAction(codeData) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_CODE_SUCCESS,
    codeData,
  };
}

export function loadExperimentCodeErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_CODE_ERROR,
    error,
  };
}
