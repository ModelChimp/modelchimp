import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailMatPlotPageDomain = state =>
  state.get('ExperimentDetailMatPlotPage', initialState);

const makeSelectExperimentDetailMatPlotPage = () =>
  createSelector(selectExperimentDetailMatPlotPageDomain, substate => {
    const matPlotData = substate.get('matPlotData');
    let result = null;

    if (matPlotData && matPlotData.summary.length > 0) {
      result = matPlotData.summary.map((e, i) => ({
        key: i,
        matPlot: e.name,
        max: e.max,
        min: e.min,
      }));
    }

    return result;
  });

export default makeSelectExperimentDetailMatPlotPage;
export { selectExperimentDetailMatPlotPageDomain };
