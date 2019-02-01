import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { mapKeys } from 'lodash';
import { loginSuccess } from 'containers/LoginPage/actions';
import { PASSWORD_RESET } from './constants';
import { passwordResetErrorAction } from './actions';

export function* passwordReset({ data }) {
  const requestURL = `rest-auth/password/reset/confirm/`;
  const formData = new FormData();

  mapKeys(data, (v, k) => formData.append(k, v));

  try {
    const response = yield ModelchimpClient.post(requestURL, {
      body: formData,
    });
    const { token } = response;
    ModelchimpClient.login(token);

    yield put(loginSuccess(token));
  } catch (err) {
    yield put(passwordResetErrorAction(err));
  }
}

export default function* passwordResetSaga() {
  yield takeLatest(PASSWORD_RESET, passwordReset);
}
