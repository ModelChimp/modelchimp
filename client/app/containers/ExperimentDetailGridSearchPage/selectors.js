import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailGridSearchPageDomain = state =>
  state.get('experimentDetailGridSearchPage', initialState);

const makeSelectExperimentDetailGridSearchPage = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate => {
    let gridsearchData = substate.get('gridsearchData');
    let result = null;

    if(gridsearchData){
      result = gridsearchData.summary.map((e,i) =>({
          key:i,
          gridsearch: e.name,
          max: e.max,
          min: e.min
      }));
    }

    return result;
  },
  );

export default makeSelectExperimentDetailGridSearchPage;
export { selectExperimentDetailGridSearchPageDomain };
