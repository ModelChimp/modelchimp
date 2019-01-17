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
  RESET_UPDATE_FLAG,
 } from './constants';

export const initialState = fromJS({
  update: false

});

function projectSettingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROJECT_DETAILS:
      return state
        .set('update',true);
    case RESET_UPDATE_FLAG:
      return state
        .set('update',false);
    default:
      return state;
  }
}

export default projectSettingReducer;
