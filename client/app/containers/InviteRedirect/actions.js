/*
 *
 * InviteRedirect actions
 *
 */

import {
  INVITE_CHECK,
  INVITE_CHECK_SUCCESS,
  INVITE_CHECK_ERROR,
} from './constants';

export function inviteCheckAction(inviteToken) {
  return {
    type: INVITE_CHECK,
    inviteToken,
  };
}

export function inviteCheckSuccessAction(existingrUser) {
  return {
    type: INVITE_CHECK_SUCCESS,
    existingrUser,
  };
}

export function inviteCheckErrorAction(error) {
  return {
    type: INVITE_CHECK_ERROR,
    error,
  };
}
