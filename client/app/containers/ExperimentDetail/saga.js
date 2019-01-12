import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL } from './constants';
import {
  loadExperimentDetailSuccessAction,
  loadExperimentDetailErrorAction,
} from './actions';

export function* getExperimentData({ modelId }) {
  const requestURL = `experiment-detail/${modelId}/meta`;

  try {
    const experiment = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentDetailSuccessAction(experiment));
  } catch (err) {
    yield put(loadExperimentDetailErrorAction(err));
  }
}

export default function* experimentData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL, getExperimentData);
}
