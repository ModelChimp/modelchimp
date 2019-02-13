/*
 *
 * ExperimentDetailMetricPage actions
 *
 */

import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  PROFILE_MODAL_OPEN,
  PROFILE_MODAL_CLOSE,
} from './constants';

export function loadProfileAction() {
  return {
    type: LOAD_PROFILE,
  };
}

export function loadProfileSuccessAction(profileData) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    profileData,
  };
}

export function loadProfilecErrorAction(error) {
  return {
    type: LOAD_PROFILE_ERROR,
    error,
  };
}

export function updateProfileAction(values, profilePic) {
  return {
    type: UPDATE_PROFILE,
    values,
    profilePic,
  };
}

export function updateProfileSuccessAction(profileData) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    profileData,
  };
}

export function updateProfilecErrorAction(error) {
  return {
    type: UPDATE_PROFILE_ERROR,
    error,
  };
}

export function profileModalOpenAction() {
  return {
    type: PROFILE_MODAL_OPEN,
  };
}

export function profileModalCloseAction() {
  return {
    type: PROFILE_MODAL_CLOSE,
  };
}
