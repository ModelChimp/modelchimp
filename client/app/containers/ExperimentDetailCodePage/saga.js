import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL_CODE } from './constants';
import {
  loadExperimentCodeSuccessAction,
  loadExperimentCodeErrorAction,
} from './actions';

export function* getExperimentCodeData({ modelId }) {
  const requestURL = `experiment/${modelId}/code/`;

  try {
    const codeData = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentCodeSuccessAction(codeData));
  } catch (err) {
    yield put(loadExperimentCodeErrorAction(err));
  }
}

export default function* experimentCodeData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_CODE, getExperimentCodeData);
}
