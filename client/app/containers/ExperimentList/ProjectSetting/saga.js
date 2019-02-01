import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { mapKeys } from 'lodash';
import {
  UPDATE_PROJECT_DETAILS,
  DELETE_PROJECT_DETAILS,
  SEND_INVITE,
} from './constants';
import {
  updateProjectSuccessAction,
  updateProjectErrorAction,
  deleteProjectSuccessAction,
  deleteProjectErrorAction,
  sendInviteSuccessAction,
  sendInviteErrorAction,
} from './actions';

export function* updateProjectData({ projectId, projectData }) {
  const requestURL = `project/${projectId}/`;
  const formData = new FormData();

  mapKeys(projectData, (v, k) => formData.append(k, v));

  try {
    const data = yield ModelchimpClient.put(requestURL, { body: formData });

    yield put(updateProjectSuccessAction(data));
  } catch (err) {
    yield put(updateProjectErrorAction(err));
  }
}

export function* deleteProjecttData({ projectId }) {
  const requestURL = `project/${projectId}/`;
  try {
    const data = yield ModelchimpClient.delete(requestURL);

    yield put(deleteProjectSuccessAction(data));
  } catch (err) {
    yield put(deleteProjectErrorAction(err));
  }
}

export function* sendInvite({ values, projectId }) {
  const requestURL = `invite/create/${projectId}/`;
  const formData = new FormData();

  mapKeys(values, (v, k) => formData.append(k, v));

  try {
    yield ModelchimpClient.post(requestURL, { body: formData });
    yield put(sendInviteSuccessAction());
  } catch (err) {
    yield put(sendInviteErrorAction(err));
  }
}

export default function* projectSettingSaga() {
  yield takeLatest(UPDATE_PROJECT_DETAILS, updateProjectData);
  yield takeLatest(DELETE_PROJECT_DETAILS, deleteProjecttData);
  yield takeLatest(SEND_INVITE, sendInvite);
}
