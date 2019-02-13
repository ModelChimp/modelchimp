import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_PROJECT_DETAIL } from './constants';
import {
  loadProjectDetailSuccessAction,
  loadProjectDetailErrorAction,
} from './actions';

function* getProjectDetail({ projectId }) {
  const projectURL = `project/${projectId}/`;
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

export { projectDetailSaga };
