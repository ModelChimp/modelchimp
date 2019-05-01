import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL_ASSET,
        LOAD_ASSET_META_FIELD,
        LOAD_ASSET_BLOB,
       } from './constants';
import {
  loadExperimentAssetSuccessAction,
  loadExperimentAssetErrorAction,
  loadExperimentAssetFieldSuccessAction,
  loadExperimentAssetFieldErrorAction,
  loadAssetBlobSuccess,
  loadAssetBlobError,
} from './actions';

export function* getExperimentAssetData({ modelId }) {
  const requestURL = `experiment/${modelId}/asset/`;

  try {
    const assetData = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentAssetSuccessAction(assetData));
  } catch (err) {
    yield put(loadExperimentAssetErrorAction(err));
  }
}

export function* getExperimentAssetFieldData({ modelId }) {
  const requestURL = `experiment/${modelId}/asset/meta-fields/`;

  try {
    const data = yield ModelchimpClient.get(requestURL);

    yield put(loadExperimentAssetFieldSuccessAction(data));
  } catch (err) {
    yield put(loadExperimentAssetFieldErrorAction(err));
  }
}

export function* getExperimentAssetBlobData({ modelId, assetId }) {
  const requestURL = `experiment/${modelId}/asset/${modelId}/`;

  try {
    const data = yield ModelchimpClient.get(requestURL);

    yield put(loadAssetBlobSuccess(data));
  } catch (err) {
    yield put(loadAssetBlobError(err));
  }
}

export default function* experimentAssetData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_ASSET, getExperimentAssetData);
  yield takeLatest(LOAD_ASSET_META_FIELD, getExperimentAssetFieldData);
  yield takeLatest(LOAD_ASSET_BLOB, getExperimentAssetBlobData);
}
