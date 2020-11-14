import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components";

import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  LandingPage as LandingPageLayout,
} from "./layouts";

import {
  Dashboard as DashboardView,
  SignUp as SignUpView,
  SignIn as SignInView,
  EmailVerification as EmailVerificationView,
  ResetPassword as ResetPasswordView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  NotFound as NotFoundView,
  LandingPage as LandingPageView,
  Candidate as CandidateView,
  Contest as ContestView,
  MyContest as MyContestView,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/contest" />

      <RouteWithLayout
        component={EmailVerificationView}
        exact
        layout={MinimalLayout}
        path="/emailVerification"
      />

      <RouteWithLayout
        component={ResetPasswordView}
        exact
        layout={MinimalLayout}
        path="/resetPassword"
      />

      <RouteWithLayout
        component={LandingPageView}
        exact
        layout={LandingPageLayout}
        path="/landingPage"
      />

      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={CandidateView}
        exact
        layout={MainLayout}
        path="/candidate"
      />
      <RouteWithLayout
        component={ContestView}
        exact
        layout={MainLayout}
        path="/contest"
      />

      <RouteWithLayout
        component={MyContestView}
        exact
        layout={MainLayout}
        path="/mycontest"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
