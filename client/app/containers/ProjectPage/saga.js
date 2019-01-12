/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';

import { LOAD_PROJECT_DATA } from './constants';
import { projectDataLoaded, projectDataError } from './actions';

export function* getProjects() {
  const requestURL = `/project/`;

  try {
    const projects = yield ModelchimpClient.get(requestURL);
    yield put(projectDataLoaded(projects));
  } catch (err) {
    yield put(projectDataError(err));
  }
}

export default function* projectData() {
  yield takeLatest(LOAD_PROJECT_DATA, getProjects);
}
