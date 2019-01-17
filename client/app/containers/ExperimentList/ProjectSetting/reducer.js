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
 } from './constants';

export const initialState = fromJS({


});

function projectSettingReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default projectSettingReducer;
