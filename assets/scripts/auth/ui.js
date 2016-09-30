'use strict';

const app = require('../app');

const logInFailure = () => {
  console.log('fail');
};

const logOutFailure = () => {
  console.log('fail');
};

const passwordChangeFailure = () => {
  console.log('fail');
};

const signUpFailure = () => {
  console.log('fail');
};

const logInSuccess = (data) => {
  app.user = data.user;
  console.log(data.user);
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
  logInSuccess,
  logOutSuccess,
  passwordChangeSuccess,
  showSignUp,
  showLogIn,
};