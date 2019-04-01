/*
 *
 * ExperimentList actions
 *
 */

import {
  GET_DATA,
  LOAD_EXPERIMENT_DATA,
  LOAD_EXPERIMENT_DATA_SUCCESS,
  LOAD_EXPERIMENT_DATA_ERROR,
  SET_EXPERIMENT_COLUMNS,
  CREATE_EXPERIMENT_LABELS,
  CREATE_EXPERIMENT_LABELS_SUCCESS,
  CREATE_EXPERIMENT_LABELS_ERROR,
  DELETE_EXPERIMENT_LABELS,
  DELETE_EXPERIMENT_LABELS_SUCCESS,
  DELETE_EXPERIMENT_LABELS_ERROR,
  ADD_DELETE_EXPERIMENT_ID,
  REMOVE_DELETE_EXPERIMENT_ID,
  CLEAR_DELETE_EXPERIMENTS,
  SUBMIT_DELETE_EXPERIMENTS,
  SUBMIT_DELETE_EXPERIMENTS_SUCCESS,
  SUBMIT_DELETE_EXPERIMENTS_ERROR,
} from './constants';

export function getDataAction() {
  return {
    type: GET_DATA,
  };
}

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

export function setExperimentColumnAction(
  columnList,
  metricColumnList,
  projectId,
) {
  return {
    type: SET_EXPERIMENT_COLUMNS,
    columnList,
    metricColumnList,
    projectId,
  };
}


export function createExperimentLabelsAction(modelId, labelData, projectId) {
  return {
    type: CREATE_EXPERIMENT_LABELS,
    modelId,
    labelData,
    projectId,
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

export function deleteExperimentLabelsAction(modelId, label, projectId) {
  return {
    type: DELETE_EXPERIMENT_LABELS,
    modelId,
    label,
    projectId,
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

export function addDeleteExperimentIdAction(eid) {
  return {
    type: ADD_DELETE_EXPERIMENT_ID,
    eid
  };
}

export function removeDeleteExperimentIdAction(eid) {
  return {
    type: REMOVE_DELETE_EXPERIMENT_ID,
    eid
  };
}

export function clearDeleteExperimentsAction() {
  return {
    type: CLEAR_DELETE_EXPERIMENTS,
  };
}

export function submitDeleteExperimentsAction(projectId) {
  console.log(projectId);
  return {
    type: SUBMIT_DELETE_EXPERIMENTS,
    projectId,
  };
}

export function submitDeleteExperimentsSuccessAction() {
  return {
    type: SUBMIT_DELETE_EXPERIMENTS_SUCCESS,
  };
}

export function submitDeleteExperimentsErrorAction(error) {
  return {
    type: SUBMIT_DELETE_EXPERIMENTS_ERROR,
    error,
  };
}
