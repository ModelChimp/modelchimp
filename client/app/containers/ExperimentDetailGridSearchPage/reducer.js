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
  gridsearchData: null
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
      .set('gridsearchData', action.gridsearchData)
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
