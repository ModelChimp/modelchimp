import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headerWrapper state domain
 */

const selectHeaderWrapperDomain = state =>
  state.get('headerWrapper', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HeaderWrapper
 */

const makeSelectHeaderWrapper = () =>
  createSelector(selectHeaderWrapperDomain, substate => substate.get('avatar'));

export default makeSelectHeaderWrapper;
export { selectHeaderWrapperDomain };
