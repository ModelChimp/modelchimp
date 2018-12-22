import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_EXPERIMENT_DATA } from './constants';
import {
  loadExperimentSuccessAction,
  loadExperimentErrorAction,
} from './actions';

import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';


export function* getExperimentList({ projectId }) {
  const requestURL = `ml-model/${projectId}/`;

  try {
    const experiments = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentSuccessAction(experiments));
  } catch (err) {
    yield put(loadExperimentErrorAction(err));
  }
}

export default function* experimentListSaga() {
  yield takeLatest(LOAD_EXPERIMENT_DATA, getExperimentList);
}
