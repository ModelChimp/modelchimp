import { call, put, takeLatest } from 'redux-saga/effects';
import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';

import request from 'utils/request';
import { LOAD_EXPERIMENT_DETAIL_PARAM } from './constants';
import {
  loadExperimentParamSuccessAction,
  loadExperimentParamErrorAction,
} from './actions';

export function* getExperimentParamData({ modelId }) {
  const requestURL = `experiment-detail/${modelId}/param`;

  try {
    const paramData = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentParamSuccessAction(paramData));
  } catch (err) {
    yield put(loadExperimentParamErrorAction(err));
  }
}

export default function* experimentParamData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_PARAM, getExperimentParamData);
}
