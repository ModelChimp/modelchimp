/*
 *
 * ExperimentDetailObjectPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_OBJECT,
  LOAD_EXPERIMENT_DETAIL_OBJECT_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_OBJECT_ERROR
  } from './constants';


export function loadExperimentObjectAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_OBJECT,
    modelId
  };
}

export function loadExperimentObjectSuccessAction(objectData) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_OBJECT_SUCCESS,
    objectData
  };
}

export function loadExperimentObjectErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_OBJECT_ERROR,
    error
  };
}
