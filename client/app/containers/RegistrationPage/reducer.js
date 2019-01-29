/*
 *
 * RegistrationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET,
 } from './constants';

export const initialState = fromJS({
  registerSuccess: false,
  registerError: false
});

function registrationPageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return state.set('registerSuccess', true);
    case REGISTER_ERROR:
      return state.set('registerError', true);
    case RESET:
      return state
            .set('registerError', false)
            .set('registerSuccess', false);
    default:
      return state;
  }
}

export default registrationPageReducer;
