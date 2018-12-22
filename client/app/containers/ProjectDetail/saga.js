import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_PROJECT_DETAIL } from './constants';
import {
  loadProjectDetailSuccessAction,
  loadProjectDetailErrorAction,
} from './actions';

import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';

export function* getProjectDetail({ projectId }) {
  const requestURL = `project/${projectId}`;

  try {
    const projectDetail = yield ModelchimpClient.get(requestURL);

    yield put(loadProjectDetailSuccessAction(projectDetail[0]));
  } catch (err) {
    yield put(loadProjectDetailErrorAction(err));
  }
}

export default function* projectDetailSaga() {
  yield takeLatest(LOAD_PROJECT_DETAIL, getProjectDetail);
}
