'use strict';

const app = require('../app');

const warning = require('../templates/warning.handlebars');

const messages = {
  signUpFail: 'Unable to create account.',
  logInFail: 'Unable to log in.',
  logOutFail: 'Unable to log out.',
  passwordChangeFail: 'Unable to change password.',
};

const renderWarning = (message) => {
  $('.message').html(warning(message));
};

const logInFailure = () => {
  renderWarning({message: messages.logInFail});
};

const logOutFailure = () => {
  renderWarning({message: messages.logOutFail});
};

const passwordChangeFailure = () => {
  renderWarning({message: messages.passwordChangeFail});
};

const signUpFailure = () => {
  renderWarning({message: messages.signUpFail});
};

const renderProfile = (data) => {
  app.user = data.user;
  let user = app.user;
  console.log('app.user is', user);
  const userProfile = require('../templates/userProfile.handlebars');
  $('.view').html(userProfile(user));
};

const logOutSuccess = () => {
  app.user = null;
  console.log('logged out');
};

const passwordChangeSuccess = () => {
  console.log('changed password');
};

const showSignUp = () => {
  const signUpForm = require('../templates/signUp.handlebars');
  $('.auth-forms').html(signUpForm);
};

const showLogIn = () => {
  console.log('clicked on log in link');
  const logInForm = require('../templates/logIn.handlebars');
  $('.auth-forms').html(logInForm);
};

module.exports = {
  logInFailure,
  logOutFailure,
  passwordChangeFailure,
  signUpFailure,
  renderProfile,
  logOutSuccess,
  passwordChangeSuccess,
  showSignUp,
  showLogIn,
};