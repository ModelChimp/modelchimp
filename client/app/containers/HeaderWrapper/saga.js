import {  put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';

import { LOAD_HEADER } from './constants';
import {
  loadHeaderSuccessAction,
  loadHeaderErrorAction,
} from './actions';

export function* getHeaderData() {
  const requestURL = `user`;

  try {
    let avatar = yield ModelchimpClient.get(requestURL);
    avatar = ModelchimpClient.getImageUrl(avatar.profile_detail.avatar);

    yield put(loadHeaderSuccessAction(avatar));
  } catch (err) {
    yield put(loadHeaderErrorAction(err));
  }
}

export default function* headerData() {
  yield takeLatest(LOAD_HEADER, getHeaderData);
}
