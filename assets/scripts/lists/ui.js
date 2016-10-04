'use strict';

const app = require('../app');

// MESSAGES

const messages = {
  getFail: 'Unable to retrieve data.',
  createListFail: 'Unable to create list.',
  updateListFail: 'Unable to update list.',
  deleteListFail: 'Unable to delete list.',
  addItemFail: 'Unable to add item.',
  deleteItemFail: 'Unable to delete item.',
  updateItemFail: 'Unable to update item.', 
};

const renderWarning = (message) => {
  const warning = require('../templates/warning.handlebars');
  $('.message').html(warning(message));
  $('.message').children().delay(3000).fadeToggle('slow');
};

const getFailure = () => {
  renderWarning({message: messages.getFail});
};

const createListFailure = () => {
  renderWarning({message: messages.createListFail});
};

const updateListFailure = () => {
  renderWarning({message: messages.updateListFail});
};

const deleteListFailure = () => {
  renderWarning({message: messages.deleteListFail});
};

const addItemFailure = () => {
  renderWarning({message: messages.addItemFail});
};

const deleteItemFailure = () => {
  renderWarning({message: messages.deleteItemFail});
};

const updateItemFailure = () => {
  renderWarning({message: messages.updateItemFail});
};

// RENDER LISTS

const renderAllLists = (lists) => {
  app.user.lists = lists;
  const allLists = require('../templates/allLists.handlebars');
  $('.profile-contents').html(allLists(lists));
};

const renderList = (data) => {
  let list = data.list;
  const singleList = require('../templates/singleList.handlebars');
  $('.profile-contents').html(singleList(list));
};

// UPDATE LIST

const editListTitle = (title) => {
  let listHeaderEdit = require('../templates/listHeaderEdit.handlebars');
  $('.list-header').html(listHeaderEdit({title}));
};

const toggleNewListForm = () => {
  let newListForm = require('../templates/newListForm.handlebars');
  if ($('.new-list-form').length > 0) {
    $('.new-list').toggle();
    $('.new-list-form').slideToggle();
  } else {
    $('ul.all-lists').before(newListForm);
    $('.new-list').toggle();
    $('.new-list-form').slideToggle();
  }
};

module.exports = {
  getFailure,
  createListFailure,
  addItemFailure,
  deleteListFailure,
  deleteItemFailure,
  updateItemFailure,
  updateListFailure,
  renderAllLists,
  renderList,
  editListTitle,
  toggleNewListForm,
};