import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from 'containers/App/constants';

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
