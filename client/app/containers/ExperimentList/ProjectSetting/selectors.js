import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectSetting state domain
 */

const selectProjectSettingDomain = state =>
  state.get('projectSetting', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectSetting
 */

const makeSelectUpdateFlag = () =>
  createSelector(selectProjectSettingDomain, substate => substate.get('update'));

export { makeSelectUpdateFlag };
