import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_PROFILE, UPDATE_PROFILE } from './constants';
import {
  loadProfileSuccessAction,
  loadProfilecErrorAction,
} from './actions';

export function* getProfileData() {
  const requestURL = `user`;

  try {
    const profileData = yield ModelchimpClient.get(requestURL);

    // Modify the avatar url
    profileData.profile_detail.avatar = ModelchimpClient.getImageUrl(profileData.profile_detail.avatar);
    yield put(loadProfileSuccessAction(profileData.profile_detail));
  } catch (err) {
    yield put(loadProfilecErrorAction(err));
  }
}

export function* updateProfileData({values}) {
  const requestURL = `user`;

  console.log(values);

}

export default function* profilecData() {
  yield takeLatest(LOAD_PROFILE, getProfileData);
  yield takeLatest(UPDATE_PROFILE, updateProfileData);
}
