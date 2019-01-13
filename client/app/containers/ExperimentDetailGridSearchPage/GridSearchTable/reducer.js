/*
 *
 * ExperimentDetailGridSearchPage reducer
 *
 */

import { fromJS } from 'immutable';
import {

  SET_CHART_FILTERS,
} from '../constants';

export const initialState = fromJS({
  filter: null
});

function experimentGridSearchTableReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHART_FILTERS:
      return state.set('filter', action.filter);
    default:
      return state;
  }
}

export default experimentGridSearchTableReducer;
