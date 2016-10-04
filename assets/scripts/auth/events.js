'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const app = require('../app');
const ui = require('./ui');

const onSignUp = (event) => {
  event.preventDefault();
  ui.authLoading();
  let signUpData = getFormFields(event.target);
  api.signUp(signUpData)
    .done(function (data, textStatus, jqXHR) {
      api.logIn(data, textStatus, jqXHR, signUpData)
        .done(ui.renderProfile)
        .fail(ui.logInFailure);
    })
    .fail(ui.signUpFailure);
};

const onLogIn = (event) => {
  event.preventDefault();
  ui.authLoading();
  let data = getFormFields(event.target);
  api.logIn(data)
    .done(ui.renderProfile)
    .fail(ui.logInFailure);
};

const onLogOut = (event) => {
  event.preventDefault();
  api.logOut()
    .done(ui.logOutSuccess)
    .fail(ui.logOutFailure);
};

const onToggleChangePassword = () => {
  event.preventDefault();
  ui.toggleChangePassword();
};

const onChangePassword = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
    .done(ui.passwordChangeSuccess)
    .fail(ui.passwordChangeFailure);
};

const onShowAuth = () => {
  event.preventDefault();
  let authForm = '';
  if ($(event.target).hasClass('sign-up')) {
    authForm = 'sign-up';
  } else if ($(event.target).hasClass('log-in')) {
    authForm = 'log-in';
  }
  ui.showAuth(authForm);
};

const onGoHome = () => {
  event.preventDefault();
  if (app.user.id) { 
    api.getUser()
      .done(ui.renderProfile)
      .fail(ui.getUserFailure);
  } else {
    ui.goHome();
  }
};

const addHandlers = () => {
  $('.view').on('submit', '#sign-up', onSignUp);
  $('.view').on('submit', '#log-in', onLogIn);
  $('.view').on('click', '.log-out', onLogOut);
  $('.view').on('click', '.change-password-link', onToggleChangePassword);
  $('.view').on('submit', '#change-password', onChangePassword);
  $('.view').on('click', '.log-in', onShowAuth);
  $('.view').on('click', '.sign-up', onShowAuth);
  $('.view').on('click', '.home-link', onGoHome);
};

module.exports = {
  addHandlers,
};