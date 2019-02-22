import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL_ASSET } from './constants';
import {
  loadExperimentAssetSuccessAction,
  loadExperimentAssetErrorAction,
} from './actions';

export function* getExperimentAssetData({ modelId }) {
  const requestURL = `experiment-detail/${modelId}/asset`;

  try {
    const assetData = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentAssetSuccessAction(assetData));
  } catch (err) {
    yield put(loadExperimentAssetErrorAction(err));
  }
}

export default function* experimentAssetData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_ASSET, getExperimentAssetData);
}
