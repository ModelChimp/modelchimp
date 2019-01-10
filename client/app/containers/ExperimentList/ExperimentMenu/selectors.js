import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailMetricPageDomain = state =>
  state.get('experimentMenuParameter', initialState);

const makeSelectExperimentMenuParameter = () =>
  createSelector(selectExperimentDetailMetricPageDomain, substate => {
    let result = [];
    let menuParam = substate.get('menuParam');

    if(menuParam.length === 0){
      return result;
    }

    for (let i = 0; i < menuParam.length; i++) {
      const data = {
        key: menuParam[i].name,
        title: menuParam[i].name,
        description: menuParam.name,
        chosen: 0,
      };
      result.push(data);
    }

    return result;
    },
  );

const makeSelectExperimentMenuMetric = () =>
  createSelector(selectExperimentDetailMetricPageDomain, substate => {
    let result = [];
    let menuMetric = substate.get('menuMetric');

    if(menuMetric.length === 0){
      return result;
    }

    for (let i = 0; i < menuMetric.length; i++) {
      let metricName = menuMetric[i].name.split("$");

      metricName = metricName[1] === '1' ? `${metricName[0]}(max)`
                    : `${metricName[0]}(min)`;

      const data = {
        key: menuMetric[i].name,
        title: metricName,
        description: menuMetric[i].name,
        chosen: 0,
      };
      result.push(data);
    }

    return result;
    },
  );

const makeSelectTargetKeys = () =>
  createSelector(selectExperimentDetailMetricPageDomain, substate =>{
    let tk = substate.get('targetKeys');
    if(tk) return tk;

    return [];
  },
);

const makeSelectTargetMetricKeys = () =>
  createSelector(selectExperimentDetailMetricPageDomain, substate =>{
    let tk = substate.get('targetMetricKeys');
    if(tk) return tk;

    return [];
  },
);

export { selectExperimentDetailMetricPageDomain,
        makeSelectExperimentMenuParameter,
        makeSelectTargetKeys,
        makeSelectTargetMetricKeys,
        makeSelectExperimentMenuMetric };