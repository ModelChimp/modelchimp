import { fromJS } from 'immutable';
import {
  LOAD_EXPERIMENT_DETAIL,
  LOAD_EXPERIMENT_DETAIL_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_ERROR,
  CREATE_EXPERIMENT_LABELS_SUCCESS,
  CREATE_EXPERIMENT_LABELS_ERROR,
  DELETE_EXPERIMENT_LABELS_SUCCESS,
  DELETE_EXPERIMENT_LABELS_ERROR,
  ON_EXPERIMENT_TAB_SELECT,
  EXPERIMENT_TAB_METRICS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  experiment: {
    name: null,
    id: null,
    project_name: null,
  },
  modelId: null,
  experimentId: null,
  shortExperimentId: null,
  experimentName: null,
  labels: null,
  tabKey: EXPERIMENT_TAB_METRICS,
});

function experimentDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPERIMENT_DETAIL:
      return state
        .set('modelId', action.modelId)
        .set('loading', true)
        .set('error', false);
    case LOAD_EXPERIMENT_DETAIL_SUCCESS:
      return state
        .set('experiment', action.experiment)
        .set('experimentId', action.experiment.experiment_id)
        .set(
          'shortExperimentId',
          action.experiment.experiment_id.substring(0, 7),
        )
        .set('experimentName', action.experiment.name)
        .set('labels', action.experiment.labels)
        .set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_ERROR:
      return state.set('error', action.error).set('loading', false);
    // case CREATE_EXPERIMENT_LABELS_SUCCESS:
    //   return state.set('labels', action.data);
    // case CREATE_EXPERIMENT_LABELS_ERROR:
    //   return state.set('error', action.error).set('loading', false);
    // case DELETE_EXPERIMENT_LABELS_SUCCESS:
    //   return state.set('labels', action.data);
    // case DELETE_EXPERIMENT_LABELS_ERROR:
    //   return state.set('error', action.error).set('loading', false);
    case ON_EXPERIMENT_TAB_SELECT:
      return state.set('tabKey', action.tabKey).set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailReducer;
