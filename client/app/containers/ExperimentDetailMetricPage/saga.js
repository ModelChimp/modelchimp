import { call, put, takeLatest } from 'redux-saga/effects';
import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';

import request from 'utils/request';
import { LOAD_EXPERIMENT_DETAIL_METRIC } from './constants';
import { loadExperimentMetricSuccessAction, loadExperimentMetricErrorAction } from './actions';

export function* getExperimentMetricData({modelId}) {
  const requestURL = `experiment-detail/${modelId}/metric`;
  try {
    const metricData = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentMetricSuccessAction(metricData));
  } catch (err) {
    yield put(loadExperimentMetricErrorAction(err));
  }
}

export default function* experimentMetricData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_METRIC, getExperimentMetricData);
}
