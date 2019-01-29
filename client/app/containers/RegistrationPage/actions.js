/*
 *
 * RegistrationPage actions
 *
 */

import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET,
 } from './constants';

export function registerAction(data) {
  return {
    type: REGISTER,
    data
  };
}

export function registerSuccessAction() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerErrorAction() {
  return {
    type: REGISTER_ERROR,
  };
}

export function resetAction() {
  return {
    type: RESET,
  };
}
