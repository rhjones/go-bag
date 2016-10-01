'use strict';

const app = require('../app');

const setUser = (data) => {
  app.user = data.user;
  console.log(data.user);
};

const renderProfile = (data) => {
  app.user.lists = data.lists;
  let user = app.user;
  console.log('app.user is', user);
  const userProfile = require('../templates/userProfile.handlebars');
  $('.view').html(userProfile(user));
};

const success = (data) => {
  console.log(data);
};

const failure = () => {
  console.log('fail');
};


module.exports = {
  setUser,
  success,
  failure,
  renderProfile,
};