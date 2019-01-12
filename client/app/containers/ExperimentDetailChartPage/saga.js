import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL_CHART } from './constants';
import {
  loadExperimentChartSuccessAction,
  loadExperimentChartErrorAction,
} from './actions';

export function* getExperimentChartData({ modelId }) {
  const requestURL = `experiment-detail/${modelId}/metric`;

  try {
    const metricData = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentChartSuccessAction(metricData));
  } catch (err) {
    yield put(loadExperimentChartErrorAction(err));
  }
}

export default function* experimentChartData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_CHART, getExperimentChartData);
}
