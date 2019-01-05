import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailChartPageDomain = state =>
  state.get('experimentDetailChartPage', initialState);

const makeSelectExperimentDetailChartPage = () =>
  createSelector(selectExperimentDetailChartPageDomain, substate => {
    let chartData = substate.get('chartData');
    let result = null;

    if(chartData){
      result = chartData.raw;
    }

    return result;
  },
  );

export default makeSelectExperimentDetailChartPage;
export { selectExperimentDetailChartPageDomain };
