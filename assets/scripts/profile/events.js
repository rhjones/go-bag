'use strict';

const api = require('./api');
const ui = require('./ui');

const buildProfile = (data) => {
  ui.setUser(data);
  api.indexLists()
    .done(ui.renderProfile)
    .fail(ui.failure);
};

module.exports = {
  buildProfile,
};