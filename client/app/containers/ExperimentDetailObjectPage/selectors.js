import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailObjectPageDomain = state =>
  state.get('experimentDetailObjectPage', initialState);

const makeSelectExperimentDetailObjectPage = () =>
  createSelector(selectExperimentDetailObjectPageDomain, substate => {
    const objectData = substate.get('objectData');
    let result = null;

    if (objectData) result = objectData;

    return result;
  });

export default makeSelectExperimentDetailObjectPage;
export { selectExperimentDetailObjectPageDomain };
