import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectExperimentDetailGridSearchPageDomain = state =>
  state.get('experimentDetailGridSearchPage', initialState);

const makeSelectExperimentGridSearchData = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate => {
    let data = substate.get('data');
    let result = null;

    // if(gridsearchData){
    //
    // }

    return data;
},);

const makeSelectExperimentGridSearchColumns = () =>
  createSelector(selectExperimentDetailGridSearchPageDomain, substate => {
    let data = substate.get('columns');
    let result = [];

    if(!data) return null;

    for(var i in data){
      let col = {
        title: data[i],
        dataIndex: data[i],
        key: data[i]
      };

      if(data[i].includes('param')){
        col['fixed']= 'left';
        col['width'] = 100;
      } else {
        col['width'] = 150;
      }

      result.push(col);
    }

    return result;
},);

export { selectExperimentDetailGridSearchPageDomain,
          makeSelectExperimentGridSearchData,
          makeSelectExperimentGridSearchColumns
        };
