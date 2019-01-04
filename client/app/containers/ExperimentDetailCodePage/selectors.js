import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailCodePageDomain = state =>
  state.get('experimentDetailCodePage', initialState);

const makeSelectExperimentDetailCodePage = () =>
  createSelector(selectExperimentDetailCodePageDomain, substate => {
    let codeData = substate.get('codeData');
    let result = null;

    if( codeData){
      result = codeData.code;
    }

    return result;
  },
  );

export default makeSelectExperimentDetailCodePage;
export { selectExperimentDetailCodePageDomain };
