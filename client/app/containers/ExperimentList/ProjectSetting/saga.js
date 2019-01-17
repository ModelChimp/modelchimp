import { put, takeLatest, select } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { UPDATE_PROJECT_DETAILS,
          DELETE_PROJECT_DETAILS
      } from './constants';
import {
  updateProjectSuccessAction,
  updateProjectErrorAction,
  deleteProjectSuccessAction,
  deleteProjectErrorAction,
} from './actions';
import {mapKeys} from 'lodash';

export function* updateProjectData({ projectId, projectData }) {
  let requestURL = `project/${projectId}/`;
  let formData = new FormData();

  mapKeys(projectData, (v,k) => formData.append(k,v));

  try {
    const data = yield ModelchimpClient.put(requestURL,
                                                {body: formData});

    yield put(updateProjectSuccessAction(data));
  } catch (err) {
    yield put(updateProjectErrorAction(err));
  }
}

export function* deleteProjecttData({ projectId }) {
  let requestURL = `project/${projectId}/`;
  try {
    const data = yield ModelchimpClient.delete(requestURL);

    yield put(deleteProjectSuccessAction(data));
  } catch (err) {
    yield put(deleteProjectErrorAction(err));
  }
}

export default function* projectSettingSaga() {
  yield takeLatest(UPDATE_PROJECT_DETAILS, updateProjectData);
  yield takeLatest(DELETE_PROJECT_DETAILS, deleteProjecttData);

}
