/*
 *
 * ProjectDetail actions
 *
 */

import {
  LOAD_PROJECT_DETAIL,
  LOAD_PROJECT_DETAIL_SUCCESS,
  LOAD_PROJECT_DETAIL_ERROR,
} from './constants';

export function loadProjectDetailAction(projectId) {
  return {
    type: LOAD_PROJECT_DETAIL,
    projectId,
  };
}

export function loadProjectDetailSuccessAction(projectDetail, projectKey) {
  return {
    type: LOAD_PROJECT_DETAIL_SUCCESS,
    projectDetail,
    projectKey
  };
}

export function loadProjectDetailErrorAction(error) {
  return {
    type: LOAD_PROJECT_DETAIL_ERROR,
    error,
  };
}
