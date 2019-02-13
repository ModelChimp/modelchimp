import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from 'containers/App/constants';

import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET,
} from './constants';

export function login(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

export function loginError(message) {
  return {
    type: LOGIN_ERROR,
    error: message,
  };
}

export function forgotPassword(values) {
  return {
    type: FORGOT_PASSWORD,
    values,
  };
}

export function forgotPasswordSuccess() {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
}

export function forgotPasswordError(error) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    error,
  };
}

export function resetStateAction() {
  return {
    type: RESET,
  };
}
