import { put, takeLatest, select } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DATA,
  CREATE_EXPERIMENT_LABELS,
  DELETE_EXPERIMENT_LABELS,
  SUBMIT_DELETE_EXPERIMENTS,
 } from './constants';
import {
  loadExperimentAction,
  loadExperimentSuccessAction,
  loadExperimentErrorAction,
  createExperimentLabelsSuccessAction,
  createExperimentLabelsErrorAction,
  deleteExperimentLabelsSuccessAction,
  deleteExperimentLabelsErrorAction,
  submitDeleteExperimentsSuccessAction,
  submitDeleteExperimentsErrorAction,
} from './actions';
import {
  makeSelectExperimentColumns,
  makeSelectExperimentMetricColumns,
  makeSelectDeleteList,
} from './selectors';
import { mapKeys } from 'lodash';


export function* getExperimentList({ projectId }) {
  let requestURL = `ml-model/${projectId}/`;
  let cols = yield select(makeSelectExperimentColumns());
  let metricCols = yield select(makeSelectExperimentMetricColumns());

  if ((cols && cols.length > 0) || (metricCols && metricCols.length > 0)) {
    cols = cols.map(e => `param_fields[]=${e}&`);
    cols = cols.join('');
    metricCols = metricCols.map(e => `metric_fields[]=${e}&`);
    metricCols = metricCols.join('');

    requestURL = `${requestURL}?${cols}${metricCols}`;
  }

  try {
    const experiments = yield ModelchimpClient.get(requestURL);

    yield put(loadExperimentSuccessAction(experiments));
  } catch (err) {
    yield put(loadExperimentErrorAction(err));
  }
}

export function* createLabel({ modelId, labelData, projectId }) {
  const requestURL = `experiment-label/${modelId}/`;
  const formData = new FormData();

  mapKeys(labelData, (v, k) => formData.append(k, v));

  try {
    const data = yield ModelchimpClient.post(requestURL, { body: formData });
    yield put(createExperimentLabelsSuccessAction(data));
    yield put(loadExperimentAction(projectId));

  } catch (err) {
    yield put(createExperimentLabelsErrorAction(err));
  }
}

export function* deleteLabel({ modelId, label, projectId }) {
  const requestURL = `experiment-label/${modelId}/?label=${label}`;

  try {
    const data = yield ModelchimpClient.delete(requestURL);

    if (data) {
      yield put(deleteExperimentLabelsSuccessAction(data));
      yield put(loadExperimentAction(projectId));
    }
  } catch (err) {
    yield put(deleteExperimentLabelsErrorAction(err));
  }
}

export function* deleteExperimentList({ projectId }) {
  let requestURL = `ml-model/${projectId}/`;
  const formData = new FormData();
  const deleteList = yield select(makeSelectDeleteList());

  formData.append('model_ids', deleteList.toJS());

  try {
    const data = yield ModelchimpClient.delete(requestURL, { body: formData });
    yield put(submitDeleteExperimentsSuccessAction());
    yield put(loadExperimentAction(projectId));
  } catch (err) {
    yield put(submitDeleteExperimentsErrorAction(err));
  }
}

export default function* experimentListSaga() {
  yield takeLatest(LOAD_EXPERIMENT_DATA, getExperimentList);
  yield takeLatest(CREATE_EXPERIMENT_LABELS, createLabel);
  yield takeLatest(DELETE_EXPERIMENT_LABELS, deleteLabel);
  yield takeLatest(SUBMIT_DELETE_EXPERIMENTS, deleteExperimentList);
}
