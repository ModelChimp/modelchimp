/*
 *
 * ExperimentDetailMatPlotPage actions
 *
 */

import {
  LOAD_EXPERIMENT_DETAIL_MATPLOT,
  LOAD_EXPERIMENT_DETAIL_MATPLOT_SUCCESS,
  LOAD_EXPERIMENT_DETAIL_MATPLOT_ERROR,
} from './constants';

export function loadExperimentMatPlotAction(modelId) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_MATPLOT,
    modelId,
  };
}

export function loadExperimentMatPlotSuccessAction(matPlotData) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_MATPLOT_SUCCESS,
    matPlotData,
  };
}

export function loadExperimentMatPlotErrorAction(error) {
  return {
    type: LOAD_EXPERIMENT_DETAIL_MATPLOT_ERROR,
    error,
  };
}
