'use strict';

// const autocomplete = require('../../../lib/jquery.autocomplete.min');
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

const onGetAllItems = (event) => {
  event.preventDefault();
  api.allItems()
    .done(ui.success)
    .fail(ui.failure);
};

// const onSearchForItems = () => {
//   api.allItems()
//     .done(ui.searchForItems)
//     .fail(ui.failure);
// };

// const fakeItems = [
//   {value: 'toothbrush', data: 1},
//   {value: 'toothpaste', data: 2},
//   {value: 'shirt', data: 3},
//   {value: 'shampoo', data: 4},
// ];

// const autocompleteOptions = {
//   lookup: fakeItems,
// };

// const onAddItem = (event) => {
//   event.preventDefault();
//   let data = getFormFields(event.target);
//   api.addItem(data)
//     .done(ui.success)
//     .fail(ui.failure);
// };


const addHandlers = () => {
  $('.new-list-form').on('submit', onNewList);
  $('a.get-all-lists').on('click', onGetAllLists);
  // $('add-items').on('submit', onAddItem);
  // $('.item-search').on('keyup', onSearchForItems);
  $('a.get-all-items').on('click', onGetAllItems);
  $('.item-search').autocomplete(api.autocompleteOptions);
};

module.exports = {
  addHandlers,
};