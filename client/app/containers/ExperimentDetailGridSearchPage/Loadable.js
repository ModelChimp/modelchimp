/**
 *
 * Asynchronously loads the component for ExperimentDetailMetricPage
 *
 */

import loadable from 'loadable-components';

import LoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('./index'), {
  LoadingComponent: LoadingIndicator,
});
