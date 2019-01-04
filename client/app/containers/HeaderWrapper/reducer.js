/*
 *
 * HeaderWrapper reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_HEADER,
  LOAD_HEADER_SUCCESS,
  LOAD_HEADER_ERROR
 } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  avatar: null
});

function headerWrapperReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HEADER:
      return state
      .set('loading', true)
      .set('error', false);
    case LOAD_HEADER_SUCCESS:
      return state
      .set('avatar', action.avatar)
    case LOAD_HEADER_ERROR:
      return state
      .set('error', action.error)
      .set('loading', false);
    default:
      return state;
  }
}

export default headerWrapperReducer;
