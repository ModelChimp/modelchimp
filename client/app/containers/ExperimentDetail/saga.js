import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { mapKeys } from 'lodash';
import {
  LOAD_EXPERIMENT_DETAIL,
  CREATE_EXPERIMENT_LABELS,
  DELETE_EXPERIMENT_LABELS,
} from './constants';
import {
  loadExperimentDetailSuccessAction,
  loadExperimentDetailErrorAction,
  createExperimentLabelsSuccessAction,
  createExperimentLabelsErrorAction,
  deleteExperimentLabelsSuccessAction,
  deleteExperimentLabelsErrorAction,
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

export function* createLabel({ modelId, labelData }) {
  const requestURL = `experiment-label/${modelId}/`;
  const formData = new FormData();

  mapKeys(labelData, (v, k) => formData.append(k, v));

  try {
    const data = yield ModelchimpClient.post(requestURL, { body: formData });
    yield put(createExperimentLabelsSuccessAction(data));
  } catch (err) {
    yield put(createExperimentLabelsErrorAction(err));
  }
}

export function* deleteLabel({ modelId, label }) {
  const requestURL = `experiment-label/${modelId}/?label=${label}`;

  try {
    const data = yield ModelchimpClient.delete(requestURL);

    if (data) {
      yield put(deleteExperimentLabelsSuccessAction(data));
    }
  } catch (err) {
    yield put(deleteExperimentLabelsErrorAction(err));
  }
}

export default function* experimentData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL, getExperimentData);
  yield takeLatest(CREATE_EXPERIMENT_LABELS, createLabel);
  yield takeLatest(DELETE_EXPERIMENT_LABELS, deleteLabel);
}
