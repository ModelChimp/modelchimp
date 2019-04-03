import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailMatPlotPageDomain = state =>
  state.get('ExperimentDetailMatPlotPage', initialState);

const makeSelectExperimentDetailMatPlotPage = () =>
  createSelector(selectExperimentDetailMatPlotPageDomain, substate => {
    return substate.get('matPlotData');
  });

export default makeSelectExperimentDetailMatPlotPage;
export { selectExperimentDetailMatPlotPageDomain };
