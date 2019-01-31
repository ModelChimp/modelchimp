import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inviteRedirect state domain
 */

const selectInviteRedirectDomain = state =>
  state.get('inviteRedirect', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by InviteRedirect
 */

const makeSelectInviteRedirect = () =>
  createSelector(selectInviteRedirectDomain, substate => substate.toJS());

export default makeSelectInviteRedirect;
export { selectInviteRedirectDomain };
