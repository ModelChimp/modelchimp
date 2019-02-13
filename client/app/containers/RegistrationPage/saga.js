import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { mapKeys } from 'lodash';
import { loginSuccess } from 'containers/LoginPage/actions';
import { REGISTER } from './constants';
import { registerErrorAction } from './actions';

export function* registerUser({ data }) {
  const requestURL = `register`;
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
    yield put(registerErrorAction(err));
  }
}

export default function* projectData() {
  yield takeLatest(REGISTER, registerUser);
}
