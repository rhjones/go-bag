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

module.exports = {
  logInFailure,
  logOutFailure,
  passwordChangeFailure,
  signUpFailure,
  logInSuccess,
  logOutSuccess,
  passwordChangeSuccess,
};