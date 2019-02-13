/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_USERNAME,
  LOAD_PROJECT_DATA,
  LOAD_PROJECT_DATA_SUCCESS,
  LOAD_PROJECT_DATA_ERROR,
  PROJECT_MODAL_OPEN,
  PROJECT_MODAL_CLOSE,
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function loadProjectData() {
  return {
    type: LOAD_PROJECT_DATA,
  };
}

export function projectDataLoaded(projects) {
  return {
    type: LOAD_PROJECT_DATA_SUCCESS,
    projects,
  };
}

export function projectDataError(error) {
  return {
    type: LOAD_PROJECT_DATA_ERROR,
    error,
  };
}

export function projectModalOpen() {
  return {
    type: PROJECT_MODAL_OPEN,
  };
}

export function projectModalClose() {
  return {
    type: PROJECT_MODAL_CLOSE,
  };
}

export function createProject(values) {
  return {
    type: CREATE_PROJECT,
    values,
  };
}

export function createProjectSuccess(projects) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    projects,
  };
}

export function createProjectError() {
  return {
    type: CREATE_PROJECT_ERROR,
  };
}
