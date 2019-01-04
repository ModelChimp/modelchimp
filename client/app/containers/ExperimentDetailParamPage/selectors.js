import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailParamPageDomain = state =>
  state.get('experimentDetailParamPage', initialState);

const makeSelectExperimentDetailParamPage = () =>
  createSelector(selectExperimentDetailParamPageDomain, substate => {
    let paramData = substate.get('paramData');
    let result = null;

    if( paramData){
      result = Object.keys(paramData).map((k,i) => ({
        key: i,
        param: k,
        value: paramData[k]
      }));
    }


    return result;
  },
  );

export default makeSelectExperimentDetailParamPage;
export { selectExperimentDetailParamPageDomain };
