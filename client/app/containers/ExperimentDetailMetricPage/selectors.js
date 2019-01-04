import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailMetricPageDomain = state =>
  state.get('experimentDetailMetricPage', initialState);

const makeSelectExperimentDetailMetricPage = () =>
  createSelector(selectExperimentDetailMetricPageDomain, substate => {
    let metricData = substate.get('metricData');
    return metricData.map((e,i) =>({
        key:i,
        metric: e.name,
        max: e.max,
        min: e.min
    }))
  },
  );

export default makeSelectExperimentDetailMetricPage;
export { selectExperimentDetailMetricPageDomain };
