import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectPasswordResetPageDomain = state =>
  state.get('passwordResetPage', initialState);

const makeSelectPasswordResetSuccess = () =>
  createSelector(selectPasswordResetPageDomain, substate => substate.get('passwordResetSuccess'));

const makeSelectPasswordResetError = () =>
  createSelector(selectPasswordResetPageDomain, substate => substate.get('passwordResetError'));


export { makeSelectPasswordResetSuccess, makeSelectPasswordResetError };
