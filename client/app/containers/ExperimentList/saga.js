import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_EXPERIMENT_DATA } from './constants';
import {
  loadExperimentSuccessAction,
  loadExperimentErrorAction,
} from './actions';
import { makeSelectExperimentColumns,
         makeSelectExperimentMetricColumns } from './selectors';

import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';


export function* getExperimentList({ projectId, columns }) {
  let requestURL = `ml-model/${projectId}/`;
  let cols = yield select(makeSelectExperimentColumns());
  let metricCols = yield select(makeSelectExperimentMetricColumns());

  if((cols && cols.length>0) || (metricCols && metricCols.length>0)){
    cols = cols.map((e) => `param_fields[]=${e}&`);
    cols = cols.join("")
    metricCols = metricCols.map((e) => `metric_fields[]=${e}&`);
    metricCols = metricCols.join("")

    requestURL =  `${requestURL}?${cols}${metricCols}`;
  }

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
