/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from 'containers/App/constants';
import ModelchimpClient from 'utils/modelchimpClient';
import {
  loginSuccess,
  loginError,
  forgotPasswordSuccess,
  forgotPasswordError,
} from './actions';
import { FORGOT_PASSWORD } from './constants';

export function* postLogin({ username, password }) {
  const requestURL = `api-token-auth/`;

  try {
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    const data = yield ModelchimpClient.post(requestURL, params);
    const { token } = data;
    ModelchimpClient.login(token);

    yield put(loginSuccess(token));
  } catch (err) {
    let message;

    switch (err.response.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      case 400:
        message = 'Invalid credentials';
        break;
      default:
        message = 'Something went wrong';
    }

    ModelchimpClient.logout();
    yield put(loginError(message));
  }
}

export function* forgotPassword({ values }) {
  const requestURL = `rest-auth/password/reset/`;
  try {
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    yield ModelchimpClient.post(requestURL, params);
    yield put(forgotPasswordSuccess());
  } catch (err) {
    yield put(forgotPasswordError(err));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, postLogin);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
}
