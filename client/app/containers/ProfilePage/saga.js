import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_PROFILE } from './constants';
import {
  loadProfileSuccessAction,
  loadProfilecErrorAction,
} from './actions';

export function* getProfileData() {
  const requestURL = `experiment-detail/${modelId}/metric`;
  
  try {
    const profileData = yield ModelchimpClient.get(requestURL);
    yield put(loadProfileSuccessAction(profileData));
  } catch (err) {
    yield put(loadProfilecErrorAction(err));
  }
}

export default function* profilecData() {
  yield takeLatest(LOAD_PROFILE, getProfileData);
}
