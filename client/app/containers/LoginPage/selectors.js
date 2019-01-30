import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectLoginDomain = state =>
  state.get('login', initialState);

const makeSelectForgotPasswordSuccess = () =>
  createSelector(selectLoginDomain, substate => substate.get('forgotPasswordSuccess'));

const makeSelectForgotPasswordError = () =>
  createSelector(selectLoginDomain, substate => substate.get('forgotPasswordError'));

export { makeSelectForgotPasswordSuccess, makeSelectForgotPasswordError };
