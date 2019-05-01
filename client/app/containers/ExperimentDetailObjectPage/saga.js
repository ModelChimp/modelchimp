import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL_OBJECT } from './constants';
import {
  loadExperimentObjectSuccessAction,
  loadExperimentObjectErrorAction,
} from './actions';

export function* getExperimentObjectData({ modelId }) {
  const requestURL = `experiment/${modelId}/object/`;

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
