import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the experimentList state domain
 */

const selectExperimentListDomain = state =>
  state.get('experimentList', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExperimentList
 */
const makeSelectLoading = () =>
 createSelector(selectExperimentListDomain, substate => substate.get('loading'));

const makeSelectExperimentList = () =>
  createSelector(selectExperimentListDomain, experimentListState =>
    experimentListState.get('experiments'),
  );

const makeSelectExperimentColumns = () =>
  createSelector(selectExperimentListDomain, experimentListState =>
    experimentListState.get('columns').get('list'),
  );

const makeSelectExperimentMetricColumns = () =>
  createSelector(selectExperimentListDomain, experimentListState =>
    experimentListState.get('columns').get('metricList'),
  );

const makeSelectExperimentColumnsPID = () =>
  createSelector(selectExperimentListDomain, experimentListState =>
    experimentListState.get('columns').get('projectId'),
  );

export { selectExperimentListDomain,
          makeSelectExperimentList,
          makeSelectExperimentColumns,
          makeSelectExperimentMetricColumns,
          makeSelectExperimentColumnsPID,
          makeSelectLoading };
