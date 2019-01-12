import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailGridSearchPageDomain = state =>
  state.get('experimentDetailGridSearchPage', initialState);

const makeSelectExperimentGridSearchData = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate => {
    const data = substate.get('data');
    return data;
  });

const makeSelectExperimentGridSearchColumns = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate => {
    const data = substate.get('columns');
    const result = [];

    if (!data) return null;

    for (let i=0; i<data.length ; i+=1) {
      const col = {
        title: data[i],
        dataIndex: data[i],
        key: data[i],
      };

      if (data[i].includes('param')) {
        col.fixed = 'left';
        col.width = 100;
      } else {
        col.width = 150;
      }

      result.push(col);
    }

    return result;
  });

const makeSelectParamColsList = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate =>
    substate.getIn(['paramCols', 'list']),
  );

const makeSelectParamColsSelected = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate =>
    substate.getIn(['paramCols', 'selected']),
  );

const makeSelectMetricColsList = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate =>
    substate.getIn(['metricCols', 'list']),
  );

const makeSelectMetricColsSelected = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate =>
    substate.getIn(['metricCols', 'selected']),
  );

export {
  selectExperimentDetailGridSearchPageDomain,
  makeSelectExperimentGridSearchData,
  makeSelectExperimentGridSearchColumns,
  makeSelectParamColsList,
  makeSelectParamColsSelected,
  makeSelectMetricColsList,
  makeSelectMetricColsSelected,
};
