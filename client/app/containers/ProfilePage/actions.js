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
  UPDATE_PROFILE_ERROR
} from './constants';

export function loadProfileAction(modelId) {
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
    type: LOAD_PROFILE_SUCCESS,
    error,
  };
}

export function updateProfileAction(values) {
  return {
    type: UPDATE_PROFILE,
    values
  };
}

export function updateProfileSuccessAction() {
  return {
    type: UPDATE_PROFILE_SUCCESS,
  };
}

export function updateProfilecErrorAction(error) {
  return {
    type: UPDATE_PROFILE_ERROR,
    error,
  };
}
