'use strict';

const app = require('../app');

const indexLists = () => {
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
  indexLists,
};