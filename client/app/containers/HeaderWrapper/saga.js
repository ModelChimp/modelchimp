import { call, put, takeLatest } from 'redux-saga/effects';
import CookiesManager from 'utils/cookiesManager';
import ModelchimpClient from 'utils/modelchimpClient';

import request from 'utils/request';
import { LOAD_HEADER } from './constants';
import { loadHeaderSuccessAction, loadExperimentParamErrorAction } from './actions';


export function* getHeaderData({modelId}) {
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
