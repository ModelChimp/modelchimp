/*
 *
 * ProjectSetting actions
 *
 */

import {
  UPDATE_PROJECT_DETAILS,
  UPDATE_PROJECT_DETAILS_SUCCESS,
  UPDATE_PROJECT_DETAILS_ERROR,
  RESET_UPDATE_FLAG,
 } from './constants';

export function updateProjectAction(projectId, projectData) {
  return {
    type: UPDATE_PROJECT_DETAILS,
    projectId,
    projectData,
  };
}

export function updateProjectSuccessAction(projectData) {
  return {
    type: UPDATE_PROJECT_DETAILS_SUCCESS,
    projectData
  };
}

export function updateProjectErrorAction() {
  return {
    type: UPDATE_PROJECT_DETAILS_ERROR,
  };
}

export function resetUpdateAction() {
  return {
    type: RESET_UPDATE_FLAG,
  };
}
