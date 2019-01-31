/*
 *
 * InviteRedirect reducer
 *
 */

import { fromJS } from 'immutable';
import { INVITE_CHECK,
INVITE_CHECK_SUCCESS,
INVITE_CHECK_ERROR,
 } from './constants';

export const initialState = fromJS({
  error: false,
  existingUser: false
});

function inviteRedirectReducer(state = initialState, action) {
  switch (action.type) {
    case INVITE_CHECK:
      return state.set('inviteToken', action.inviteToken);
    case INVITE_CHECK_SUCCESS:
      return state.set('existingUser', action.existingrUser);
    case INVITE_CHECK_ERROR:
      return state.set('inviteToken', action.inviteToken);
    default:
      return state;
  }
}

export default inviteRedirectReducer;
