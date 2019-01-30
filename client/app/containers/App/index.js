/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import ProjectPage from 'containers/ProjectPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import Logout from 'containers/Logout/Loadable';
import ExperimentList from 'containers/ExperimentList/Loadable';
import ExperimentDetail from 'containers/ExperimentDetail/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import RegistrationPage from 'containers/RegistrationPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import PasswordResetPage from 'containers/PasswordResetPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import PrivateRoute from './PrivateRoute';
import Footer from 'components/Footer';
import {Layout} from 'antd';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {/*  <Header /> */}
      <Switch >
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <PrivateRoute path="/projects" component={ProjectPage} />
        <PrivateRoute
          path="/experiment-detail/:modelId"
          component={ExperimentDetail}
        />
        <PrivateRoute path="/experiment-list/:id" component={ExperimentList} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <Route path="/reset/:uid/:token/" component={PasswordResetPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </div>
  );
}
