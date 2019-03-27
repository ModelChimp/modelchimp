import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetail = state =>
  state.get('label', initialState);

const makeSelectLabels = () =>
  createSelector(selectExperimentDetail, experimentDetailState =>
    experimentDetailState.get('labelData'),
  );

export {
  selectExperimentDetail,
  makeSelectLabels,
};
