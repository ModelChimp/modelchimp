import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL, CREATE_EXPERIMENT_LABELS } from './constants';
import {
  loadExperimentDetailSuccessAction,
  loadExperimentDetailErrorAction,
  loadExperimentLabelsSuccessAction,
  loadExperimentLabelsErrorAction,
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

// export function* getLabelsData({ modelId }) {
//   const requestURL = `experiment-label/${modelId}/`;
//
//   try {
//     const data = yield ModelchimpClient.get(requestURL);
//     yield put(loadExperimentLabelsSuccessAction(data));
//   } catch (err) {
//     yield put(loadExperimentLabelsErrorAction(err));
//   }
// }

export default function* experimentData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL, getExperimentData);
}
