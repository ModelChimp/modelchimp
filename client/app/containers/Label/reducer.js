import { fromJS } from 'immutable';
import {
  LOAD_EXPERIMENT_LABELS,
  LOAD_EXPERIMENT_LABELS_SUCCESS,
  LOAD_EXPERIMENT_LABELS_ERROR,
  CREATE_EXPERIMENT_LABELS_SUCCESS,
  CREATE_EXPERIMENT_LABELS_ERROR,
  DELETE_EXPERIMENT_LABELS_SUCCESS,
  DELETE_EXPERIMENT_LABELS_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  modelId: null,
  labelData: null,
});

function labelReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_LABELS:
      return state
        .set('modelId', action.modelId)
        .set('loading', true)
        .set('error', false);
    case LOAD_EXPERIMENT_LABELS_SUCCESS:
      return state
        .set('labelData', action.labelData)
        .set('loading', false);
    case LOAD_EXPERIMENT_LABELS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case CREATE_EXPERIMENT_LABELS_SUCCESS:
      return state.set('labelData', action.data);
    case CREATE_EXPERIMENT_LABELS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case DELETE_EXPERIMENT_LABELS_SUCCESS:
      return state.set('labelData', action.data);
    case DELETE_EXPERIMENT_LABELS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default labelReducer;
