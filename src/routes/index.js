import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import isNotLoggin from '../shared/authenticate';
import App from '../components/app';
import SignupPage from '../components/signup/signup-page';
import SigninPage from '../components/signin/signin-page';
import SignupSuccess from '../components/signup/signup-success';
import Verify from '../components/signin/verify';
import AccountPage from '../components/accounts/account-page';
import ProfilePage from '../components/accounts/profile-page';
import PassPage from '../components/accounts/password-page';
import PassReset from '../components/accounts/reset-page';
import ResetForm from '../components/accounts/reset-form';
import RenewForm from '../components/accounts/renew-form';
import UserPage from '../components/main/user-page';

export default (
  <Route path='/'>
    <IndexRoute Component={App} />
    <Route path='signup' component={SignupPage} />
  </Route>
)
