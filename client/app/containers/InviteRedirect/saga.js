import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { INVITE_CHECK } from './constants';
import { inviteCheckSuccessAction, inviteCheckErrorAction } from './actions';

export function* registerUser({ inviteToken }) {
  const requestURL = `invite/${inviteToken}/`;

  try {
    const response = yield ModelchimpClient.get(requestURL);
    yield put(inviteCheckSuccessAction(response.existing_user));
  } catch (err) {
    yield put(inviteCheckErrorAction(err));
  }
}

export default function* projectData() {
  yield takeLatest(INVITE_CHECK, registerUser);
}
