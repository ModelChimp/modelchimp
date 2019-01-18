import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectProjectSettingDomain = state =>
  state.get('projectSetting', initialState);

const makeSelectUpdateFlag = () =>
  createSelector(selectProjectSettingDomain, substate => substate.get('update'));

const makeSelectDeleteFlag = () =>
  createSelector(selectProjectSettingDomain, substate => substate.get('delete'));

const makeSelectMenuKey = () =>
  createSelector(selectProjectSettingDomain, substate => substate.get('menuKey'));

const makeSelectInvite = () =>
  createSelector(selectProjectSettingDomain, substate => substate.get('invite'));

export {
  makeSelectUpdateFlag,
  makeSelectDeleteFlag,
  makeSelectMenuKey,
  makeSelectInvite,
};
