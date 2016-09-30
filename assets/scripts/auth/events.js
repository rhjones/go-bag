'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onSignUp = (event) => {
  event.preventDefault();
  let signUpData = getFormFields(event.target);
  api.signUp(signUpData)
    .done(function (data, textStatus, jqXHR) {
      api.logIn(data, textStatus, jqXHR, signUpData)
        .done(ui.logInSuccess)
        .fail(ui.logInFailure);
    })
    .fail(ui.signUpFailure);
};

const onLogIn = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.logIn(data)
    .done(ui.logInSuccess)
    .fail(ui.logInFailure);
};

const onLogOut = (event) => {
  event.preventDefault();
  api.logOut()
    .done(ui.logOutSuccess)
    .fail(ui.logOutFailure);
};

const onChangePassword = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
    .done(ui.passwordChangeSuccess)
    .fail(ui.passwordChangeFailure);
};

const onToggleChangePassword = () => {
  ui.toggleChangePassword();
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#log-in').on('submit', onLogIn);
  $('.log-out').on('click', onLogOut);
  $('#change-password').on('submit', onChangePassword);
  $('.auth-forms').on('click', 'a.log-in', ui.showLogIn);
  $('.auth-forms').on('click', 'a.sign-up', ui.showSignUp);
  // $('a.sign-up').on('click', ui.showSignUp);
  // $('a.log-in').on('click', function() {console.log('clicked');});
  $('.change-password-link').on('click', onToggleChangePassword);
};

module.exports = {
  addHandlers,
};