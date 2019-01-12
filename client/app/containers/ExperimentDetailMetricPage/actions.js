/*
 *
 * ExperimentDetailMetricPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_METRIC,
  LOAD_EXPERIMENT_DETAIL_METRIC_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_METRIC_ERROR,
} from './constants';

export function loadExperimentMetricAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_METRIC,
    modelId,
  };
}

export function loadExperimentMetricSuccessAction(metricData) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_METRIC_SUCCESS,
    metricData,
  };
}

export function loadExperimentMetricErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_METRIC_ERROR,
    error,
  };
}
