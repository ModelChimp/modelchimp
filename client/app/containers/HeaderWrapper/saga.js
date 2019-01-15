import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';

import { LOAD_HEADER } from './constants';
import { loadHeaderSuccessAction, loadHeaderErrorAction } from './actions';

export function* getHeaderData() {
  const requestURL = `user`;

  try {
    let data = yield ModelchimpClient.get(requestURL);
    let avatarData = ModelchimpClient.getImageUrl(data.avatar);

    yield put(loadHeaderSuccessAction(avatarData));
  } catch (err) {
    yield put(loadHeaderErrorAction(err));
  }
}

export default function* headerData() {
  yield takeLatest(LOAD_HEADER, getHeaderData);
}
