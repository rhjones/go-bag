'use strict';

const app = require('../app');

const warning = require('../templates/warning.handlebars');

const messages = {
  signUpFail: 'Unable to create account.',
  logInFail: 'Unable to log in.',
  logOutFail: 'Unable to log out.',
  passwordChangeFail: 'Unable to change password.',
};

const home = require('../templates/home.handlebars');
const logInForm = require('../templates/logIn.handlebars');
const signUpForm = require('../templates/signUp.handlebars');

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
  $('.auth-forms').html(signUpForm);
};

const showLogIn = () => {
  console.log('clicked on log in link');
  $('.auth-forms').html(logInForm);
};

const showAuth = (authForm) => {
  const auth = require('../templates/auth.handlebars');
  $('.view').html(auth);
  if (authForm === 'sign-up') {
    showSignUp();
  } else if (authForm === 'log-in') {
    showLogIn();
  }
};

const goHome = () => {
  if (app.user.id) {
    renderProfile(app);
  } else {
    $('.view').html(home);
  }
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
  showAuth,
  goHome,
};