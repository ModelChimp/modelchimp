/*
 *
 * ProjectSetting reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_PROJECT_DETAILS,
  UPDATE_PROJECT_DETAILS_SUCCESS,
  UPDATE_PROJECT_DETAILS_ERROR,
  RESET_STATE_FLAG,
  DELETE_PROJECT_DETAILS_SUCCESS,
 } from './constants';

export const initialState = fromJS({
  update: false,
  delete: false,
});

function projectSettingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROJECT_DETAILS:
      return state
        .set('update',true);
    case RESET_STATE_FLAG:
      return state
        .set('update',false)
        .set('delete',false);
    case DELETE_PROJECT_DETAILS_SUCCESS:
      return state
        .set('delete',true);
    default:
      return state;
  }
}

export default projectSettingReducer;
