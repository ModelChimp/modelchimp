import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_PROFILE, UPDATE_PROFILE } from './constants';
import {
  loadProfileSuccessAction,
  loadProfilecErrorAction,
  updateProfileSuccessAction,
  updateProfilecErrorAction,
} from './actions';

export function* getProfileData() {
  const requestURL = `user`;

  try {
    const profileData = yield ModelchimpClient.get(requestURL);
    yield put(loadProfileSuccessAction(profileData));
  } catch (err) {
    yield put(loadProfilecErrorAction(err));
  }
}

export function* updateProfileData({ values }) {
  const requestURL = `user`;

  try {
    const profileData = yield ModelchimpClient.post(requestURL, {
      body: values,
    });
    yield put(updateProfileSuccessAction(profileData));
  } catch (err) {
    yield put(updateProfilecErrorAction(err));
  }
}

export default function* profilecData() {
  yield takeLatest(LOAD_PROFILE, getProfileData);
  yield takeLatest(UPDATE_PROFILE, updateProfileData);
}
