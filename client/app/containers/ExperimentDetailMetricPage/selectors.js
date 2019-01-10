import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailMetricPageDomain = state =>
  state.get('experimentDetailMetricPage', initialState);

const makeSelectExperimentDetailMetricPage = () =>
  createSelector(selectExperimentDetailMetricPageDomain, substate => {
    let metricData = substate.get('metricData');
    let result = null;

    if(metricData && metricData.summary.length > 0){
      result = metricData.summary.map((e,i) =>({
          key:i,
          metric: e.name,
          max: e.max,
          min: e.min
      }));
    }

    return result;
  },
  );

export default makeSelectExperimentDetailMetricPage;
export { selectExperimentDetailMetricPageDomain };
