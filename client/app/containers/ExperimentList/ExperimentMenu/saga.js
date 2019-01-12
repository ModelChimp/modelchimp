import { put, takeLatest } from 'redux-saga/effects';
import ModelchimpClient from 'utils/modelchimpClient';
import { LOAD_MENU_PARAMETER } from './constants';
import {
  loadMenuParameterSuccessAction,
  loadMenuParameterErrorAction,
} from './actions';

export function* getExperimentMenuParameterData({ projectId }) {
  const requestURL = `ml-model/get-param/${projectId}/`;

  try {
    const menuParam = yield ModelchimpClient.get(requestURL);

    yield put(loadMenuParameterSuccessAction(menuParam));
  } catch (err) {
    yield put(loadMenuParameterErrorAction(err));
  }
}

export default function* experimentMenuParameterData() {
  yield takeLatest(LOAD_MENU_PARAMETER, getExperimentMenuParameterData);
}
