import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetail = state =>
  state.get('experimentDetail', initialState);

const makeSelectExperimentDetail = () =>
  createSelector(selectExperimentDetail, experimentDetailState =>
    experimentDetailState.get('experiment'),
  );

const makeSelectExperimentId = () =>
  createSelector(selectExperimentDetail, experimentDetailState =>
    experimentDetailState.get('experimentId'),
  );

const makeSelectExperimentName = () =>
  createSelector(selectExperimentDetail, experimentDetailState => {
    const expId = experimentDetailState.get('experimentId');
    const shortExpId = experimentDetailState.get('shortExperimentId');
    const expName = experimentDetailState.get('experimentName');

    if (expId === expName) {
      return shortExpId;
    }

    return expName;
  });

const makeSelectShortExperimentId = () =>
  createSelector(selectExperimentDetail, experimentDetailState =>
    experimentDetailState.get('shortExperimentId'),
  );

const makeSelectLabels = () =>
  createSelector(selectExperimentDetail, experimentDetailState =>
    experimentDetailState.get('labels'),
  );

export {
  selectExperimentDetail,
  makeSelectExperimentDetail,
  makeSelectExperimentId,
  makeSelectShortExperimentId,
  makeSelectExperimentName,
  makeSelectLabels,
};
