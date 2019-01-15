import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';

import { LOAD_HEADER } from './constants';
import { loadHeaderSuccessAction, loadHeaderErrorAction } from './actions';

export function* getHeaderData() {
  const requestURL = `user`;

  try {
    let data = yield ModelchimpClient.get(requestURL);

    yield put(loadHeaderSuccessAction(data.avatar));
  } catch (err) {
    yield put(loadHeaderErrorAction(err));
  }
}

export default function* headerData() {
  yield takeLatest(LOAD_HEADER, getHeaderData);
}
