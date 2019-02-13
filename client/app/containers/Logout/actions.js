import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_ERROR } from 'containers/App/constants';

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutError() {
  return {
    type: LOGOUT_ERROR,
  };
}
