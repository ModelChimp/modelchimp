import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { mapKeys } from 'lodash';
import {
  LOAD_EXPERIMENT_LABELS,
  CREATE_EXPERIMENT_LABELS,
  DELETE_EXPERIMENT_LABELS,
} from './constants';
import {
  createExperimentLabelsSuccessAction,
  createExperimentLabelsErrorAction,
  deleteExperimentLabelsSuccessAction,
  deleteExperimentLabelsErrorAction,
  loadExperimentLabelsSuccessAction,
  loadExperimentLabelsErrorAction,
} from './actions';

export function* getExperimentLabel({ modelId }) {
  const requestURL = `experiment-detail/${modelId}/meta`;
  console.log(modelId);
  try {
    const experiment = yield ModelchimpClient.get(requestURL);
    yield put(loadExperimentLabelsSuccessAction(experiment.labels));
  } catch (err) {
    yield put(loadExperimentLabelsErrorAction(err));
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

export default function* labelData() {
  yield takeLatest(CREATE_EXPERIMENT_LABELS, createLabel);
  yield takeLatest(DELETE_EXPERIMENT_LABELS, deleteLabel);
  yield takeLatest(LOAD_EXPERIMENT_LABELS, getExperimentLabel);
}
