'use strict';

// const app = require('../app');

const warning = require('../templates/warning.handlebars');

const messages = {
  fail: 'Fail.',
  getFail: 'Unable to retrieve data.',
  createListFail: 'Unable to create list.',
  addItemFail: 'Unable to add item.',
  deleteListFail: 'Unable to delete list.',
  deleteItemFail: 'Unable to delete item.',
  updateItemFail: 'Unable to update item.',
};

const renderWarning = (message) => {
  $('.message').html(warning(message));
};

const failure = () => {
  renderWarning({message: messages.fail});
};

const getFailure = () => {
  renderWarning({message: messages.getFail});
};

const createListFailure = () => {
  renderWarning({message: messages.createListFail});
};

const addItemFailure = () => {
  renderWarning({message: messages.addItemFail});
};

const deleteListFailure = () => {
  renderWarning({message: messages.deleteListFail});
};

const deleteItemFailure = () => {
  renderWarning({message: messages.deleteItemFail});
};

const updateItemFailure = () => {
  renderWarning({message: messages.updateItemFail});
};

const success = (data) => {
  console.log(data);
};

const searchForItems = (items) => {
  console.log(items);
};

const renderList = (data) => {
  let list = data.list;
  const singleList = require('../templates/singleList.handlebars');
  $('.profile-contents').html(singleList(list));
};

const renderAllLists = (lists) => {
  console.log(lists);
  const allLists = require('../templates/allLists.handlebars');
  $('.profile-contents').html(allLists(lists));
};

const editListTitle = (list_id, list_title) => {
  let listForm = $('form[data-id=' + list_id + ']');
  let title = $(listForm).children('h1');
  title.html('<input type="text" placeholder="' + list_title + '">');
  console.log(list_title);
  console.log(listForm);
};

module.exports = {
  failure,
  getFailure,
  createListFailure,
  addItemFailure,
  deleteListFailure,
  deleteItemFailure,
  updateItemFailure,
  success,
  searchForItems,
  renderList,
  renderAllLists,
  editListTitle,
};