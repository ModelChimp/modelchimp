/*
 *
 * PasswordResetPage actions
 *
 */

 import {
   PASSWORD_RESET,
   PASSWORD_RESET_SUCCESS,
   PASSWORD_RESET_ERROR,
   RESET,
  } from './constants';


 export function passwordResetAction(data) {
   return {
     type: PASSWORD_RESET,
     data
   };
 }

 export function passwordResetSuccessAction() {
   return {
     type: PASSWORD_RESET_SUCCESS,
   };
 }

 export function passwordResetErrorAction() {
   return {
     type: PASSWORD_RESET_ERROR,
   };
 }

 export function resetAction() {
   return {
     type: RESET,
   };
 }
