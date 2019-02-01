import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectInviteRedirectDomain = state =>
  state.get('inviteRedirect', initialState);

const makeSelectExistingUser = () =>
  createSelector(selectInviteRedirectDomain, substate =>
    substate.get('existingUser'),
  );

const makeSelectError = () =>
  createSelector(selectInviteRedirectDomain, substate => substate.get('error'));

export { makeSelectExistingUser, makeSelectError };
