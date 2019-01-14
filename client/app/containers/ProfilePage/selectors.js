import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfilePageDomain = state =>
  state.get('profilePage', initialState);

const makeSelectProfile = () =>
  createSelector(selectProfilePageDomain, substate => {
    return substate.get('profileData');
  });

export default makeSelectProfile;
