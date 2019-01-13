import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gridSearchTable state domain
 */

const selectGridSearchTableDomain = state =>
  state.get('gridSearchTable', initialState);


const makeSelectGridSearchTable = () =>
  createSelector(selectGridSearchTableDomain, substate => substate.get('filter'));

export default makeSelectGridSearchTable;
export { selectGridSearchTableDomain };
