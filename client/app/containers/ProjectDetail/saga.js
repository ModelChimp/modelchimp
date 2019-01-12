import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_PROJECT_DETAIL, LOAD_PROJECT_TEAM } from './constants';
import {
  loadProjectDetailSuccessAction,
  loadProjectDetailErrorAction,
  loadProjectTeamSuccessAction,
  loadProjectTeamErrorAction,
} from './actions';

function* getProjectDetail({ projectId }) {
  const projectURL = `project/${projectId}`;
  const projectKeyURL = `project/key/${projectId}/`;

  try {
    const projectDetail = yield ModelchimpClient.get(projectURL);
    const projectKey = yield ModelchimpClient.get(projectKeyURL);

    yield put(loadProjectDetailSuccessAction(projectDetail[0], projectKey.key));
  } catch (err) {
    yield put(loadProjectDetailErrorAction(err));
  }
}

function* projectDetailSaga() {
  yield takeLatest(LOAD_PROJECT_DETAIL, getProjectDetail);
}

function* getProjectTeam({ projectId }) {
  const projectURL = `project/${projectId}`;

  try {
    const projectDetail = yield ModelchimpClient.get(projectURL);

    yield put(loadProjectDetailSuccessAction(projectDetail[0], projectKey.key));
  } catch (err) {
    yield put(loadProjectDetailErrorAction(err));
  }
}

function* projectTeamSaga() {
  yield takeLatest(LOAD_PROJECT_TEAM, getProjectDetail);
}

export { projectDetailSaga, projectTeamSaga };
