/*
 *
 * ExperimentDetailMetricPage actions
 *
 */

import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
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
