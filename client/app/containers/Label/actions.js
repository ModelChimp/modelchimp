/*
 *
 * Label actions
 *
 */

import {
  CREATE_EXPERIMENT_LABELS,
  CREATE_EXPERIMENT_LABELS_SUCCESS,
  CREATE_EXPERIMENT_LABELS_ERROR,
  DELETE_EXPERIMENT_LABELS,
  DELETE_EXPERIMENT_LABELS_SUCCESS,
  DELETE_EXPERIMENT_LABELS_ERROR,
  LOAD_EXPERIMENT_LABELS,
  LOAD_EXPERIMENT_LABELS_SUCCESS,
  LOAD_EXPERIMENT_LABELS_ERROR,
} from './constants';


export function loadExperimentLabelsAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_LABELS,
    modelId,
  };
}

export function loadExperimentLabelsSuccessAction(labelData) {
  return {
    type: LOAD_EXPERIMENT_LABELS_SUCCESS,
    labelData,
  };
}

export function loadExperimentLabelsErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_LABELS_ERROR,
    error,
  };
}

export function createExperimentLabelsAction(modelId, labelData) {
  return {
    type: CREATE_EXPERIMENT_LABELS,
    modelId,
    labelData,
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

export function deleteExperimentLabelsAction(modelId, label) {
  return {
    type: DELETE_EXPERIMENT_LABELS,
    modelId,
    label,
  };
}

export function deleteExperimentLabelsSuccessAction(data) {
  return {
    type: DELETE_EXPERIMENT_LABELS_SUCCESS,
    data,
  };
}

export function deleteExperimentLabelsErrorAction(error) {
  return {
    type: DELETE_EXPERIMENT_LABELS_ERROR,
    error,
  };
}
