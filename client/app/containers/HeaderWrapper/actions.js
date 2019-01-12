import {
  LOAD_HEADER,
  LOAD_HEADER_SUCCESS,
  LOAD_HEADER_ERROR,
} from './constants';

export function loadHeader() {
  return {
    type: LOAD_HEADER,
  };
}

export function loadHeaderSuccessAction(avatar) {
  return {
    type: LOAD_HEADER_SUCCESS,
    avatar,
  };
}

export function loadHeaderErrorAction(error) {
  return {
    type: LOAD_HEADER_ERROR,
    error,
  };
}
