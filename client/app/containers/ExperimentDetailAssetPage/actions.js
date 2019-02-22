/*
 *
 * ExperimentDetailAssetPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_ASSET,
  LOAD_EXPERIMENT_DETAIL_ASSET_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_ASSET_ERROR,
} from './constants';

export function loadExperimentAssetAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_ASSET,
    modelId,
  };
}

export function loadExperimentAssetSuccessAction(assetData) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_ASSET_SUCCESS,
    assetData,
  };
}

export function loadExperimentAssetErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_ASSET_ERROR,
    error,
  };
}
