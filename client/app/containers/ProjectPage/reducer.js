
import { fromJS } from 'immutable';

import {
  LOAD_PROJECT_DATA,
  LOAD_PROJECT_DATA_SUCCESS,
  LOAD_PROJECT_DATA_ERROR,
  PROJECT_MODAL_OPEN,
  PROJECT_MODAL_CLOSE,
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  modalVisible: null
});

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT_DATA:
      return state.set('loading', true).set('error', false);
    case LOAD_PROJECT_DATA_SUCCESS:
      return state.set('projects', action.projects).set('loading', false);
    case LOAD_PROJECT_DATA_ERROR:
      return state.set('error', action.error).set('loading', false);
    case PROJECT_MODAL_OPEN:
      return state.set('modalVisible', true);
    case PROJECT_MODAL_CLOSE:
      return state.set('modalVisible', false);
    case CREATE_PROJECT_SUCCESS:
      return state
              .set('projects', action.projects)
              .set('loading', false)
              .set('modalVisible', false);
    case CREATE_PROJECT_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default projectReducer;
