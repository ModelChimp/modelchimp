import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the experimentDetail state domain
 */

const selectExperimentDetailDomain = state =>
  state.get('experimentDetail', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExperimentDetail
 */

const makeSelectExperimentDetail = () =>
  createSelector(selectExperimentDetailDomain, substate => substate.toJS());

export default makeSelectExperimentDetail;
export { selectExperimentDetailDomain };
