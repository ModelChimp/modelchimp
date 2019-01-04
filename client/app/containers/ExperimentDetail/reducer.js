import { fromJS } from 'immutable';
import { LOAD_EXPERIMENT_DETAIL,
          LOAD_EXPERIMENT_DETAIL_SUCCESS,
          LOAD_EXPERIMENT_DETAIL_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  experiment: {
    name:null,
    id:null,
    project_name:null
  },
  modelId: null,
  experimentId: null,
  shortExperimentId: null,
  experimentName: null,
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
      // .set('modelId', action.experiment.id)
      .set('experimentId', action.experiment.experiment_id)
      .set('shortExperimentId', action.experiment.experiment_id.substring(0,7))
      .set('experimentName', action.experiment.name)
      .set('loading', false);
    case LOAD_EXPERIMENT_DETAIL_ERROR:
      return state
      .set('error', action.error)
      .set('loading', false);
    default:
      return state;
  }
}

export default experimentDetailReducer;
