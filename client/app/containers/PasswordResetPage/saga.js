import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { PASSWORD_RESET } from './constants';
import {
  passwordResetSuccessAction,
  passwordResetErrorAction,
 } from './actions';
import {mapKeys} from 'lodash';
import { loginSuccess, loginError } from 'containers/LoginPage/actions';


export function* passwordReset({data}) {
  const requestURL = `rest-auth/password/reset/confirm/`;
  let formData = new FormData();
  console.log(data)
  mapKeys(data, (v,k) => formData.append(k,v));

  try {
    const response = yield ModelchimpClient.post(requestURL, {body: formData});
    // const { token } = response;
    // ModelchimpClient.login(token);
    //
    // yield put(loginSuccess(token));
  } catch (err) {
    yield put(registerErrorAction(err));
  }
}

export default function* passwordResetSaga() {
  yield takeLatest(PASSWORD_RESET, passwordReset);
}
