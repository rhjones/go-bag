'use strict';

const app = require('../app');

const signUp = (data) => {
  let request = $.ajax({
    url: app.host + '/sign-up',
    method: 'POST',
    data: data,
  });
  return request;
};

const logIn = (data) => {
  let request = $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: data,
  });
  return request;
};

const logOut = () => {
  let request = $.ajax({
    url: app.host + '/sign-out/' + app.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
  return request;
};

const changePassword = (data) => {
  let request = $.ajax({
    url: app.host + '/change-password/' + app.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
  return request;
};

const autoLogIn = (userData, textStatus, jqXHR, signUpData) => {
  let request = $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: signUpData,
  });
  return request;
};

module.exports = {
  signUp,
  logIn,
  logOut,
  changePassword,
  autoLogIn,
};