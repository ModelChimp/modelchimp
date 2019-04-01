/*
 *
 * ExperimentDetailMetricPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MENU_PARAMETER,
  LOAD_MENU_PARAMETER_SUCCESS,
  LOAD_MENU_PARAMETER_ERROR,
  SET_COLUMN_TARGET_KEY,
  SET_COLUMN_TARGET_METRIC_KEY,
  ON_MENU_SELECT,
  MENU_EXPERIMENT,
  ON_DELETE_CLICK,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  menuParam: false,
  menuMetric: false,
  targetKeys: false,
  targetMetricKeys: false,
  menuKey: MENU_EXPERIMENT,
  deleteVisible: true
});

function experimentDetailMetricPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MENU_PARAMETER:
      return state
        .set('loading', true)
        .set('error', false)
        .set('projectId', action.projectId);
    case LOAD_MENU_PARAMETER_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('menuParam', action.menuParam.parameter)
        .set('menuMetric', action.menuParam.metric);
    case LOAD_MENU_PARAMETER_ERROR:
      return state.set('loading', false).set('error', action.error);
    case SET_COLUMN_TARGET_KEY:
      return state.set('targetKeys', action.targetKeys);
    case SET_COLUMN_TARGET_METRIC_KEY:
      return state.set('targetMetricKeys', action.targetMetricKeys);
    case ON_MENU_SELECT:
      return state.set('menuKey', action.menuKey);
    case ON_DELETE_CLICK:
      return state.set('deleteVisible', !state.get('deleteVisible'));
    default:
      return state;
  }
}

export default experimentDetailMetricPageReducer;
