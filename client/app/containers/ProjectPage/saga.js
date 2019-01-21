/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';

import {
  LOAD_PROJECT_DATA,
  CREATE_PROJECT
 } from './constants';
import {
  projectDataLoaded,
  projectDataError,
  createProjectSuccess,
  createProjectError,
 } from './actions';

export function* getProjects() {
  const requestURL = `/project/`;

  try {
    const projects = yield ModelchimpClient.get(requestURL);
    yield put(projectDataLoaded(projects));
  } catch (err) {
    yield put(projectDataError(err));
  }
}

export function* createProject({values}) {
  const requestURL = `/project/`;

  try {
    const projects = yield ModelchimpClient.post(requestURL, { body : values });
    yield put(createProjectSuccess(projects));
  } catch (err) {
    yield put(createProjectError(err));
  }
}

export default function* projectData() {
  yield takeLatest(LOAD_PROJECT_DATA, getProjects);
  yield takeLatest(CREATE_PROJECT, createProject);

}
