/*
 *
 * RegistrationPage reducer
 *
 */

import { fromJS } from 'immutable';
import { REGISTER } from './constants';

export const initialState = fromJS({});

function registrationPageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state;
    default:
      return state;
  }
}

export default registrationPageReducer;
