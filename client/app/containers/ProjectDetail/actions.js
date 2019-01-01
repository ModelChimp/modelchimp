/*
 *
 * ProjectDetail actions
 *
 */

import {
  LOAD_PROJECT_DETAIL,
  LOAD_PROJECT_DETAIL_SUCCESS,
  LOAD_PROJECT_DETAIL_ERROR,
  LOAD_PROJECT_TEAM,
  LOAD_PROJECT_TEAM_SUCCESS,
  LOAD_PROJECT_TEAM_ERROR
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


const loadProjectTeamAction = (projectId) => ({
  type: LOAD_PROJECT_TEAM,
  projectId,
});

const loadProjectTeamSuccessAction = (team) => ({
  type: LOAD_PROJECT_TEAM_SUCCESS,
  team,
});

const loadProjectTeamErrorAction = (error) => ({
  type: LOAD_PROJECT_TEAM_ERROR,
  error,
});

export {
  loadProjectTeamAction,
  loadProjectTeamSuccessAction,
  loadProjectTeamErrorAction
};
