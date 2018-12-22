/*
 *
 * ExperimentList actions
 *
 */

import {
  LOAD_EXPERIMENT_DATA,
  LOAD_EXPERIMENT_DATA_SUCCESS,
  LOAD_EXPERIMENT_DATA_ERROR,
} from './constants';

export function loadExperimentAction(projectId) {
  return {
    type: LOAD_EXPERIMENT_DATA,
    projectId,
  };
}

export function loadExperimentSuccessAction(experiments) {
  return {
    type: LOAD_EXPERIMENT_DATA_SUCCESS,
    experiments,
  };
}

export function loadExperimentErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DATA_ERROR,
    error,
  };
}
