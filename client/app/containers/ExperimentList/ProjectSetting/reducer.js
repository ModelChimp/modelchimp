/*
 *
 * ProjectSetting reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_PROJECT_DETAILS,
  RESET_STATE_FLAG,
  DELETE_PROJECT_DETAILS_SUCCESS,
  DETAILS_KEY,
  SET_MENU_KEY,
  SEND_INVITE_SUCCESS,
} from './constants';

export const initialState = fromJS({
  update: false,
  delete: false,
  invite: false,
  menuKey: DETAILS_KEY,
});

function projectSettingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROJECT_DETAILS:
      return state.set('update', true);
    case RESET_STATE_FLAG:
      return state
        .set('update', false)
        .set('invite', false)
        .set('delete', false);
    case DELETE_PROJECT_DETAILS_SUCCESS:
      return state.set('delete', true);
    case SEND_INVITE_SUCCESS:
      return state.set('invite', true);
    case SET_MENU_KEY:
      return state.set('menuKey', action.key);
    default:
      return state;
  }
}

export default projectSettingReducer;
