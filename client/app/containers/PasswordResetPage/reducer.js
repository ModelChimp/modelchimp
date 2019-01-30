/*
 *
 * PasswordResetPage reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   PASSWORD_RESET,
   PASSWORD_RESET_SUCCESS,
   PASSWORD_RESET_ERROR,
   RESET,
  } from './constants';

 export const initialState = fromJS({
   passwordResetSuccess: false,
   passwordResetError: false
 });

 function passwordResetPageReducer(state = initialState, action) {
   switch (action.type) {
     case PASSWORD_RESET_SUCCESS:
       return state.set('passwordResetSuccess', true);
     case PASSWORD_RESET_ERROR:
       return state.set('passwordResetError', true);
     case RESET:
       return state
             .set('passwordResetError', false)
             .set('passwordResetSuccess', false);
     default:
       return state;
   }
 }

 export default passwordResetPageReducer;
