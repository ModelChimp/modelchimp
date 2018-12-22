import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuthLogged } from 'containers/App/selectors';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends React.PureComponent {
  render() {
    const { component: Component, logged, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          logged ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  logged: makeSelectAuthLogged(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(PrivateRoute);
