/*
 *
 * RegistrationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET,
} from './constants';

export const initialState = fromJS({
  forgotPasswordSuccess: false,
  forgotPasswordError: false,
});

function registrationPageReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return state.set('forgotPasswordSuccess', true);
    case FORGOT_PASSWORD_ERROR:
      return state.set('forgotPasswordError', true);
    case RESET:
      return state
        .set('forgotPasswordError', false)
        .set('forgotPasswordSuccess', false);
    default:
      return state;
  }
}

export default registrationPageReducer;
