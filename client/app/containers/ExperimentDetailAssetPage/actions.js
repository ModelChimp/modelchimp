/*
 *
 * ExperimentDetailAssetPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_ASSET,
  LOAD_EXPERIMENT_DETAIL_ASSET_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_ASSET_ERROR,
  LOAD_ASSET_META_FIELD,
  LOAD_ASSET_META_FIELD_SUCCESS,
  LOAD_ASSET_META_FIELD_ERROR,
  LOAD_ASSET_BLOB,
  LOAD_ASSET_BLOB_SUCCESS,
  LOAD_ASSET_BLOB_ERROR,
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


export function loadExperimentAssetFieldAction(modelId) {
  return {
    type: LOAD_ASSET_META_FIELD,
    modelId,
  };
}

export function loadExperimentAssetFieldSuccessAction(assetFieldData) {
  return {
    type: LOAD_ASSET_META_FIELD_SUCCESS,
    assetFieldData,
  };
}

export function loadExperimentAssetFieldErrorAction(error) {
  return {
    type: LOAD_ASSET_META_FIELD_ERROR,
    error,
  };
}

export const loadAssetBlob = (modelId, assetId) => ({
    type: LOAD_ASSET_BLOB,
    modelId,
    assetId,
});

export const loadAssetBlobSuccess = (assetBlobData) => ({
    type: LOAD_ASSET_BLOB_SUCCESS,
    assetBlobData,
});

export const loadAssetBlobError = (error) => ({
    type: LOAD_ASSET_BLOB_ERROR,
    error,
});
