/*
 *
 * ExperimentDetail actions
 *
 */

import { LOAD_EXPERIMENT_DETAIL,
          LOAD_EXPERIMENT_DETAIL_SUCCESS,
          LOAD_EXPERIMENT_DETAIL_ERROR } from './constants';

export function loadExperimentDetailAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL,
    modelId
  };
}

export function loadExperimentDetailSuccessAction(experiment) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_SUCCESS,
    experiment
  };
}

export function loadExperimentDetailErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_ERROR,
    error
  };
}
