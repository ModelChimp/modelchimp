import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentMenuPageDomain = state =>
  state.get('experimentMenuParameter', initialState);

const makeSelectExperimentMenuParameter = () =>
  createSelector(selectExperimentMenuPageDomain, substate => {
    const result = [];
    const menuParam = substate.get('menuParam');

    if (menuParam.length === 0) {
      return result;
    }

    for (let i = 0; i < menuParam.length; i += 1) {
      const data = {
        key: menuParam[i].name,
        title: menuParam[i].name,
        description: menuParam.name,
        chosen: 0,
      };
      result.push(data);
    }

    return result;
  });

const makeSelectExperimentMenuMetric = () =>
  createSelector(selectExperimentMenuPageDomain, substate => {
    const result = [];
    const menuMetric = substate.get('menuMetric');

    if (menuMetric.length === 0) {
      return result;
    }

    for (let i = 0; i < menuMetric.length; i += 1) {
      let metricName = menuMetric[i].name.split('$');

      metricName =
        metricName[1] === '1'
          ? `${metricName[0]}(max)`
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
  });

const makeSelectTargetKeys = () =>
  createSelector(selectExperimentMenuPageDomain, substate => {
    const tk = substate.get('targetKeys');
    if (tk) return tk;

    return [];
  });

const makeSelectTargetMetricKeys = () =>
  createSelector(selectExperimentMenuPageDomain, substate => {
    const tk = substate.get('targetMetricKeys');
    if (tk) return tk;

    return [];
  });

const makeSelectMenuKey = () =>
  createSelector(selectExperimentMenuPageDomain, substate => substate.get('menuKey'));


export {
  selectExperimentMenuPageDomain,
  makeSelectExperimentMenuParameter,
  makeSelectTargetKeys,
  makeSelectTargetMetricKeys,
  makeSelectExperimentMenuMetric,
  makeSelectMenuKey,
};
