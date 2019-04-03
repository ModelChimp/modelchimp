import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_EXPERIMENT_DETAIL_MATPLOT } from './constants';
import {
  loadExperimentMatPlotSuccessAction,
  loadExperimentMatPlotErrorAction,
} from './actions';

export function* getExperimentMatPlotData({ modelId }) {
  const requestURL = `experiment-mat-plot/details/${modelId}/`;

  try {
    const matPlotData = yield ModelchimpClient.get(requestURL);
    console.log(matPlotData);
    yield put(loadExperimentMatPlotSuccessAction(matPlotData));
  } catch (err) {
    yield put(loadExperimentMatPlotErrorAction(err));
  }
}

export default function* experimentMatPlotData() {
  yield takeLatest(LOAD_EXPERIMENT_DETAIL_MATPLOT, getExperimentMatPlotData);
}
