import { fromJS } from 'immutable';
import experimentDetailMetricPageReducer from '../reducer';

describe('experimentDetailMetricPageReducer', () => {
  it('returns the initial state', () => {
    expect(experimentDetailMetricPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
