import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetail = state =>
  state.get('experimentDetailPage', initialState);

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
    let expId = experimentDetailState.get('experimentId');
    let shortExpId = experimentDetailState.get('shortExperimentId');
    let expName = experimentDetailState.get('experimentName');

    if( expId === expName){
      return shortExpId;
    }

    return expName;
  }, );

const makeSelectShortExperimentId = () =>
  createSelector(selectExperimentDetail, experimentDetailState =>
    experimentDetailState.get('shortExperimentId'),
  );

export { selectExperimentDetail,
          makeSelectExperimentDetail,
          makeSelectExperimentId,
          makeSelectShortExperimentId,
          makeSelectExperimentName
        };
