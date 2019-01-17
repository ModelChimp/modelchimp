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

const makeSelectProjectSetting = () =>
  createSelector(selectProjectSettingDomain, substate => substate.toJS());

export default makeSelectProjectSetting;
export { selectProjectSettingDomain };
