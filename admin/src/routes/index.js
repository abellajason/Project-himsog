import React from 'react';
import {
  withRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import { Card } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '../modules/core/containers/MainLayout';
import Login from '../modules/core/containers/Login';
import Signup from '../modules/core/containers/Signup';
import Admins from '../modules/admins/routes';
import Volunteers from '../modules/volunteers/routes';
import Children from '../modules/children/routes';
import Dashboard from '../modules/dashboard/containers/Dashboard';
import DonationAdd from '../modules/donations/containers/DonationAdd';
import { StripeProvider, Elements } from 'react-stripe-elements';

function NotFound() {
  return (
    <Card>
      <h3>
        Error 404: Page Not Found
      </h3>
    </Card>
  );
}

class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component, isAuthenticated, path, location, ...rest
    } = this.props;

    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
            <MainLayout path={path} history={props.history} location={location}>
              <Component />
            </MainLayout>
        ) : (
          <Login />
        )
      )}/>
    );
  }
}

class UnauthenticatedOnlyRoute extends React.Component {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={props => (
        !isAuthenticated ? (
            <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/',
          }}/>
        )
      )}/>
    );
  }
}

class MainRoutes extends React.Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <Switch>
        <Route exact path="/donate" render={() => {
          return (
            <StripeProvider apiKey="pk_test_UCXlnZFICCob5QP5ugmyUke600ov7ZUh4v">
              <Elements>
                <DonationAdd />
              </Elements>
            </StripeProvider>
          )
        }}></Route>
        <UnauthenticatedOnlyRoute path="/login" component={Login} isAuthenticated={isAuthenticated}></UnauthenticatedOnlyRoute>
        <UnauthenticatedOnlyRoute path="/signup" component={Signup} isAuthenticated={isAuthenticated}></UnauthenticatedOnlyRoute>
        <PrivateRoute path="/volunteers" component={Volunteers} {...{isAuthenticated}}></PrivateRoute>
        <PrivateRoute path="/admins" component={Admins} {...{isAuthenticated}}></PrivateRoute>
        <PrivateRoute path="/children" component={Children} {...{isAuthenticated}}></PrivateRoute>
        <PrivateRoute exact path="/" component={Dashboard} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute path="/dashboard" component={Dashboard} {...{ isAuthenticated }}></PrivateRoute>
        <PrivateRoute component={NotFound} isAuthenticated={isAuthenticated}></PrivateRoute>

      </Switch>
    );
  }
}


export default withRouter(
  connect(state => ({
    ...state.core,
  }))(MainRoutes),
);
