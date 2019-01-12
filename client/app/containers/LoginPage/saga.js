/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from 'containers/App/constants';
import ModelchimpClient from 'utils/modelchimpClient';
import { loginSuccess, loginError } from './actions';

export function* postLogin({ username, password }) {
  const requestURL = `api-token-auth/`;

  try {
    const params = {
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

export default function* loginSaga() {
  yield takeLatest(LOGIN, postLogin);
}
