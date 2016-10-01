'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onGetAllLists = () => {
  if ($(event.target).is('a'))  {
    event.preventDefault();
  }
  api.getAllLists()
    .done(ui.renderAllLists)
    .fail(ui.failure);
};

const onNewList = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.newList(data)
    .done(onGetAllLists)
    .fail(ui.failure);
};

const onGetList = (data) => {
  let list_id = '';
  // if onGetList is called because user selected a list
  if ($(event.target).is('a'))  {
    console.log('event.target', event.target);
    event.preventDefault();
    list_id = $(event.target).attr('data-id');
  }
  // if onGetList is called because user just added an item
  else {
    list_id = data.content.list.id;
  }
  api.getList(list_id)
    .done(function(data) {
      ui.renderList(data);
      $('.item-search').autocomplete(api.autocompleteOptions);
    })
    .fail(ui.failure);
};

const onAddItemToList = (event) => {
  event.preventDefault();
  let contentData = getFormFields(event.target);
  contentData.content.item_id = $(event.target).find('.item-search').attr('data-id');
  if (contentData.content.item_id) {
    api.addItemToList(contentData)
      .done(onGetList)
      .fail(ui.failure);
  } else {
    api.addNewItem(contentData)
      .done(function(data) {
        let newContentData = {
          content: {
            item_id: data.item.id,
            list_id: contentData.content.list_id,
          }
        };
        api.addItemToList(newContentData)
          .done(onGetList)
          .fail(ui.failure);
      })
      .fail(ui.failure);
  }
};

const addHandlers = () => {
  $('.view').on('click', 'a.edit-list', onGetList);
  $('.view').on('submit', 'form.new-list-form', onNewList);
  $('.view').on('submit', 'form.add-item', onAddItemToList);
  $('.view').on('click', 'a.close-list', onGetAllLists);
};

module.exports = {
  addHandlers,
};