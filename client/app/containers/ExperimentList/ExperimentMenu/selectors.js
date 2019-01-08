import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailMetricPageDomain = state =>
  state.get('experimentMenuParameter', initialState);

const makeSelectExperimentMenuMetricPage = () =>
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

const makeSelectTargetKeys = () =>
  createSelector(selectExperimentDetailMetricPageDomain, substate =>{
    let tk = substate.get('targetKeys');
    if(tk) return tk;

    return [];
  },
);

export { selectExperimentDetailMetricPageDomain,
        makeSelectExperimentMenuMetricPage,
        makeSelectTargetKeys };
