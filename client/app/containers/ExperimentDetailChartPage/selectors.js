import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailChartPageDomain = state =>
  state.get('experimentDetailChartPage', initialState);

const makeSelectExperimentDetailMetricChartPage = () =>
  createSelector(selectExperimentDetailChartPageDomain, substate => {
    const chartData = substate.get('chartData');
    let result = null;

    if (chartData) {
      result = chartData.metric;
    }

    return result;
  });

const makeSelectExperimentDetailDurationChartPage = () =>
  createSelector(selectExperimentDetailChartPageDomain, substate => {
    const chartData = substate.get('chartData');
    let result = null;

    if (chartData) {
      result = chartData.duration;
    }

    return result;
  });

export {
  makeSelectExperimentDetailMetricChartPage,
  makeSelectExperimentDetailDurationChartPage,
  selectExperimentDetailChartPageDomain,
};
