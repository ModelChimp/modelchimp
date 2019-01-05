import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailChartPageDomain = state =>
  state.get('experimentDetailChartPage', initialState);

const makeSelectExperimentDetailChartPage = () =>
  createSelector(selectExperimentDetailChartPageDomain, substate => {
    let chartData = substate.get('chartData');
    let result = null;

    if(chartData){
      result = chartData.raw.evaluation.accuracy_test.map((e,i) =>({
        x : e.epoch,
        y : e.value
      }));
    }

    return result;
  },
  );

export default makeSelectExperimentDetailChartPage;
export { selectExperimentDetailChartPageDomain };
