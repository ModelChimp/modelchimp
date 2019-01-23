/*
 *
 * ExperimentDetail actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL,
  LOAD_EXPERIMENT_DETAIL_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_ERROR,
  CREATE_EXPERIMENT_LABELS,
  CREATE_EXPERIMENT_LABELS_SUCCESS,
  CREATE_EXPERIMENT_LABELS_ERROR,
} from './constants';

export function loadExperimentDetailAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL,
    modelId,
  };
}

export function loadExperimentDetailSuccessAction(experiment) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_SUCCESS,
    experiment,
  };
}

export function loadExperimentDetailErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_ERROR,
    error,
  };
}

export function createExperimentLabelsAction(modelId, labelData) {
  return {
    type: CREATE_EXPERIMENT_LABELS,
    modelId,
    labelData
  };
}

export function createExperimentLabelsSuccessAction(data) {
  return {
    type: CREATE_EXPERIMENT_LABELS_SUCCESS,
    data,
  };
}

export function createExperimentLabelsErrorAction(error) {
  return {
    type: CREATE_EXPERIMENT_LABELS_ERROR,
    error,
  };
}
