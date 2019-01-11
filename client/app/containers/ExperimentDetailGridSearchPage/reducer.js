/*
 *
 * ExperimentDetailGridSearchPage reducer
 *
 */

import { fromJS } from 'immutable';
import {   LOAD_EXPERIMENT_DETAIL_GRIDSEARCH,
            LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_SUCCESS,
            LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_ERROR
    } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: null,
  columns: null,
  paramCols : {
    list: null,
    selected: null
  },
  metricCols : {
    list: null,
    selected: null
  },
});

function experimentDetailGridSearchPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_GRIDSEARCH:
      return state
      .set('modelId', action.modelId)
      .set('loading', true)
      .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_SUCCESS:
      return state
      .set('data', action.gridsearchData.data)
      .set('columns', action.gridsearchData.columns)
      .setIn(['paramCols','list'], action.paramColumns)
      .setIn(['metricCols', 'list'], action.metricColumns)
      .set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_GRIDSEARCH_ERROR:
      return state
      .set('error', action.error)
      .set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailGridSearchPageReducer;
