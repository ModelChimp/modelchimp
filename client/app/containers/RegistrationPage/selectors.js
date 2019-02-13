import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegistrationPageDomain = state =>
  state.get('registrationPage', initialState);

const makeSelectRegisterSuccess = () =>
  createSelector(selectRegistrationPageDomain, substate =>
    substate.get('registerSuccess'),
  );

const makeSelectRegisterError = () =>
  createSelector(selectRegistrationPageDomain, substate =>
    substate.get('registerError'),
  );

export { makeSelectRegisterSuccess, makeSelectRegisterError };
