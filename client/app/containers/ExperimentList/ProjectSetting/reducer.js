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
  MEMBERS_KEY,
  DETAILS_KEY,
  SET_MENU_KEY,
 } from './constants';

export const initialState = fromJS({
  update: false,
  delete: false,
  menuKey: DETAILS_KEY
});

function projectSettingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROJECT_DETAILS:
      return state
        .set('update', true);
    case RESET_STATE_FLAG:
      return state
        .set('update', false)
        .set('delete', false);
    case DELETE_PROJECT_DETAILS_SUCCESS:
      return state
        .set('delete', true);
    case SET_MENU_KEY:
      return state
        .set('menuKey', action.key);
    default:
      return state;
  }
}

export default projectSettingReducer;
