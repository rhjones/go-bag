'use strict';

const app = require('../app');

const newList = (data) => {
  console.log('in api');
  let request = $.ajax({
    url: app.host + '/lists',
    method: 'POST',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
  return request;
};

const allLists = () => {
  let request = $.ajax({
    url: app.host + '/lists',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
  return request;
};

module.exports = {
  newList,
  allLists,
};