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

const onGetAllLists = (event) => {
  event.preventDefault();
  api.allLists()
    .done(ui.getAllLists)
    .fail(ui.failure);
};

const onGetAllListContents = (data) => {
  api.allListItems(data)
    .done(ui.renderListContents)
    .fail(ui.failure);
};

const onAddItemToList = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  data.content.item_id = $(event.target).find('.item-search').attr('data-id');
  api.addItemToList(data)
    .done(onGetAllListContents)
    .fail(ui.failure);
};

const addHandlers = () => {
  $('.new-list-form').on('submit', onNewList);
  $('a.get-all-lists').on('click', onGetAllLists);
  // $('a.get-all-items').on('click', onGetAllItems);
  $('.item-search').autocomplete(api.autocompleteOptions);
  $('.add-item').on('submit', onAddItemToList);
};

module.exports = {
  addHandlers,
};