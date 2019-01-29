import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { REGISTER } from './constants';
import {
  registerSuccessAction,
  registerErrorAction,
 } from './actions';
import {mapKeys} from 'lodash';

export function* registerUser({data}) {
  const requestURL = `register`;
  let formData = new FormData();

  mapKeys(data, (v,k) => formData.append(k,v));

  try {
    const response = yield ModelchimpClient.post(requestURL, {body: formData});
    yield put(registerSuccessAction(response));
  } catch (err) {
    yield put(registerErrorAction(err));
  }
}

export default function* projectData() {
  yield takeLatest(REGISTER, registerUser);
}
