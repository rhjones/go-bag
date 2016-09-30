'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onNewList = (event) => {
  console.log('clicked submit');
  event.preventDefault();
  let data = getFormFields(event.target);
  api.newList(data)
    .done(ui.success)
    .fail(ui.failure);
};

const addHandlers = () => {
  $('.new-list-form').on('submit', onNewList);
};

module.exports = {
  addHandlers,
};