import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectExperimentDetailCodePageDomain = state =>
  state.get('experimentDetailCodePage', initialState);

const makeSelectExperimentDetailCodePage = () =>
  createSelector(selectExperimentDetailCodePageDomain, substate => {
    const codeData = substate.get('codeData');
    let result = null;

    if (codeData) {
      result = codeData.code;
    }

    return result;
  });

const makeSelectIPythonFlag = () =>
  createSelector(selectExperimentDetailCodePageDomain, substate => {
    const codeData = substate.get('codeData');
    let result = null;

    if (codeData) {
      result = codeData.ipython_flag;
    }

    return result;
  });

export { makeSelectExperimentDetailCodePage, makeSelectIPythonFlag };
