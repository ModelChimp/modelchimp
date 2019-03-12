import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailAssetPageDomain = state =>
  state.get('experimentDetailAssetPage', initialState);

const makeSelectAssetData = () =>
  createSelector(selectExperimentDetailAssetPageDomain, substate => {
    return substate.get('assetData');
  });

const makeSelectAssetField = () =>
  createSelector(selectExperimentDetailAssetPageDomain, substate => {
    return substate.get('assetFieldData');
  });

export default makeSelectAssetData;
export { selectExperimentDetailAssetPageDomain, makeSelectAssetField };
