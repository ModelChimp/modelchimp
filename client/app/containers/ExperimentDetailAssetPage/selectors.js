import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailAssetPageDomain = state =>
  state.get('experimentDetailAssetPage', initialState);

const makeSelectExperimentDetailAssetPage = () =>
  createSelector(selectExperimentDetailAssetPageDomain, substate => {
    // const assetData = substate.get('assetData');
    // let result = null;
    //
    // if (assetData) {
    //   result = Object.keys(assetData).map((k, i) => ({
    //     key: i,
    //     asset: k,
    //     value: assetData[k],
    //   }));
    // }

    return substate.get('assetData');
  });

export default makeSelectExperimentDetailAssetPage;
export { selectExperimentDetailAssetPageDomain };
