/*
 *
 * ExperimentDetailAssetPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_EXPERIMENT_DETAIL_ASSET,
  LOAD_EXPERIMENT_DETAIL_ASSET_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_ASSET_ERROR,
  LOAD_ASSET_META_FIELD_SUCCESS,
  LOAD_ASSET_META_FIELD_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  assetData: null,
});

function experimentDetailAssetPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_ASSET:
      return state
        .set('modelId', action.modelId)
        .set('loading', true)
        .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_ASSET_SUCCESS:
      return state.set('assetData', action.assetData).set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_ASSET_ERROR:
      return state.set('error', action.error).set('loading', false);
    case LOAD_ASSET_META_FIELD_SUCCESS:
      return state.set('assetFieldData', action.assetFieldData).set('loading', false);
    case LOAD_ASSET_META_FIELD_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailAssetPageReducer;
