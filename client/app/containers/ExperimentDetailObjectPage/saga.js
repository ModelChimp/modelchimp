import { call, put, takeLatest } from 'redux-saga/effects';
import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';

import request from 'utils/request';
import { LOAD_EXPERIMENT_DETAIL_OBJECT } from './constants';
import {
  loadExperimentObjectSuccessAction,
  loadExperimentObjectErrorAction,
} from './actions';

export function* getExperimentObjectData({ modelId }) {
  const requestURL = `experiment-detail/${modelId}/object`;

  try {
    const objectData = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentObjectSuccessAction(objectData));
  } catch (err) {
    yield put(loadExperimentObjectErrorAction(err));
  }
}

export default function* experimentObjectData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_OBJECT, getExperimentObjectData);
}
