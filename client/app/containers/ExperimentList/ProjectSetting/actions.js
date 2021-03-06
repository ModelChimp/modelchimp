/*
 *
 * ProjectSetting actions
 *
 */

import {
  UPDATE_PROJECT_DETAILS,
  UPDATE_PROJECT_DETAILS_SUCCESS,
  UPDATE_PROJECT_DETAILS_ERROR,
  DELETE_PROJECT_DETAILS,
  DELETE_PROJECT_DETAILS_SUCCESS,
  DELETE_PROJECT_DETAILS_ERROR,
  RESET_STATE_FLAG,
  SET_MENU_KEY,
  SEND_INVITE,
  SEND_INVITE_SUCCESS,
  SEND_INVITE_ERROR,
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
    projectData,
  };
}

export function updateProjectErrorAction() {
  return {
    type: UPDATE_PROJECT_DETAILS_ERROR,
  };
}

export function resetStateAction() {
  return {
    type: RESET_STATE_FLAG,
  };
}

export function deleteProjectAction(projectId) {
  return {
    type: DELETE_PROJECT_DETAILS,
    projectId,
  };
}

export function deleteProjectSuccessAction() {
  return {
    type: DELETE_PROJECT_DETAILS_SUCCESS,
  };
}

export function deleteProjectErrorAction() {
  return {
    type: DELETE_PROJECT_DETAILS_ERROR,
  };
}

export function setMenuKey(key) {
  return {
    type: SET_MENU_KEY,
    key,
  };
}

export function sendInviteAction(values, projectId) {
  return {
    type: SEND_INVITE,
    values,
    projectId,
  };
}

export function sendInviteSuccessAction() {
  return {
    type: SEND_INVITE_SUCCESS,
  };
}

export function sendInviteErrorAction() {
  return {
    type: SEND_INVITE_ERROR,
  };
}
