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

const logIn = (data, textStatus, jqXHR, signUpData) => {
  let request = $.ajax({
    url: app.host + '/sign-in',
    method: 'POST',
    data: signUpData ? signUpData : data,
  });
  return request;
};

const logOut = () => {
  return $.ajax({
    url: app.host + '/sign-out/' + app.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
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

module.exports = {
  signUp,
  logIn,
  logOut,
  changePassword,
};