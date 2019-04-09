/*
 *
 * ExperimentDetailMatPlotPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_EXPERIMENT_DETAIL_MATPLOT,
  LOAD_EXPERIMENT_DETAIL_MATPLOT_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_MATPLOT_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  matPlotData: null,
});

function ExperimentDetailMatPlotPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL_MATPLOT:
      return state
        .set('modelId', action.modelId)
        .set('loading', true)
        .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_MATPLOT_SUCCESS:
      return state.set('matPlotData', action.matPlotData).set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_MATPLOT_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default ExperimentDetailMatPlotPageReducer;
