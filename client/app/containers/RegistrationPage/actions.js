/*
 *
 * RegistrationPage actions
 *
 */

import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR
 } from './constants';

export function registerAction() {
  return {
    type: REGISTER,
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
