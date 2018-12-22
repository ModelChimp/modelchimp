import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProjectDetailDomain = state =>
  state.get('projectDetail', initialState);

const makeSelectProjectDetail = () =>
  createSelector(selectProjectDetailDomain, projectDetailState =>
    projectDetailState.get('projectDetail'),
  );

export default makeSelectProjectDetail;
export { selectProjectDetailDomain };
