'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

// LISTS: index

const onGetAllLists = () => {
  event.preventDefault();
  api.getAllLists()
    .done(ui.renderAllLists)
    .fail(ui.getFailure);
};

// LISTS: create

const onToggleNewListForm = () => {
  event.preventDefault();
  ui.toggleNewListForm();
};

const onNewList = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.newList(data)
    .done(onGetAllLists)
    .fail(ui.createListFailure);
};

// LISTS: show

const onGetList = (data) => {
  let list_id = '';
  // if onGetList is called after deleting content
  if (Number.isInteger(Number.parseInt(data, 10))) {
    list_id = data;
  }
  // if onGetList is called because user selected a list
  else if ($(event.target).is('a') || $(event.target).is('i'))  {
    event.preventDefault();
    list_id = $(event.target).attr('data-id');
  }
  // if onGetList is called because user just added content
  else {
    list_id = data.content.list.id;
  }
  api.getList(list_id)
    .done(function(data) {
      ui.renderList(data);
      $('.item-search').autocomplete(api.autocompleteOptions);
    })
    .fail(ui.getFailure);
};

// LISTS: update

const onEditList = (event) => {
  event.preventDefault();
  let title = $(event.target).parents('form').find('.list-title').html();
  ui.editListTitle(title);
};

const onCancelEditList = (event) => {
  event.preventDefault();
  let list_id = $(event.target).parents('form.add-item').attr('data-id');
  onGetList(list_id);
};

const onUpdateList = (event) => {
  event.preventDefault();
  let list_id = ($(event.target).parents('form.add-item').attr('data-id'));
  let formData = getFormFields(document.getElementsByClassName('add-item')[0]);
  let data = {
    list: {
      id: list_id,
      title: formData.list.title,
    }
  };
  api.updateList(data)
    .done(function() {
      api.getList(list_id)
        .done(function(data) {
          ui.renderList(data);
          $('.item-search').autocomplete(api.autocompleteOptions);
        })
        .fail(ui.getFailure);
    })
    .fail(ui.updateListFailure);
};

// LISTS: clone

const onCloneList = () => {
  event.preventDefault();
  let list_id = $(event.target).parents('li').attr('data-id');
  api.cloneList(list_id)
    .done(onGetAllLists)
    .fail(ui.createListFailure);
};

// LISTS: delete

const onDeleteList = (event) => {
  event.preventDefault();
  let list_id = '';
  if ($(event.target).attr('data-id')) {
    list_id = $(event.target).attr('data-id');
  } else if ($(event.target).parents('form').attr('data-id')) {
    list_id = $(event.target).parents('form').attr('data-id');
  } else if ($(event.target).parent().attr('data-id')) {
    list_id = $(event.target).parent().attr('data-id');
  }
  api.deleteList(list_id)
    .done(onGetAllLists)
    .fail(ui.deleteListFailure);
};

// LISTS: add, delete, and update content

const onAddItemToList = (event) => {
  event.preventDefault();
  let contentData = getFormFields(event.target);
  contentData.content.item_id = $(event.target).find('.item-search').attr('data-id');
  if (contentData.content.item_id) {
    api.addItemToList(contentData)
      .done(onGetList)
      .fail(ui.addItemFailure);
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
          .fail(ui.addItemFailure);
      })
      .fail(ui.addItemFailure);
  }
};

const onDeleteContent = (event) => {
  event.preventDefault();
  let content_id = $(event.target).parents('li').attr('data-id');
  let list_id = $(event.target).parents('ul').attr('data-id');
  api.deleteContent(content_id)
    .done(function() {
      onGetList(list_id);
    })
    .fail(ui.deleteItemFailure);
};

const onTogglePackedContent = (event) => {
  let content_id = $(event.target).parent().attr('data-id');
  let packed = $(event.target).prop('checked');
  let list_id = $(event.target).parents('ul').attr('data-id');
  let data = {
    content: {
      id: content_id,
      packed: packed,
    },
  };
  api.updateContent(data)
    .done(function() {
      onGetList(list_id);
    })
    .fail(ui.updateItemFailure);
};

const addHandlers = () => {
  $('.view').on('click', 'a.close-list', onGetAllLists);
  $('.view').on('click', 'a.new-list', onToggleNewListForm);
  $('.view').on('click', 'a.cancel-new-list', onToggleNewListForm);
  $('.view').on('submit', 'form.new-list-form', onNewList);
  $('.view').on('click', 'a.view-list', onGetList);
  $('.view').on('click', 'a.edit-list', onEditList);
  $('.view').on('click', '.list-title-edit', onEditList);
  $('.view').on('click', 'a.cancel-edit-list', onCancelEditList);
  $('.view').on('click', 'a.update-list', onUpdateList);
  $('.view').on('click', 'a.clone-list', onCloneList);
  $('.view').on('click', 'a.delete-list', onDeleteList);
  $('.view').on('submit', 'form.add-item', onAddItemToList);  
  $('.view').on('click', 'a.delete-content', onDeleteContent);
  $('.view').on('click', '.pack-content', onTogglePackedContent);
};

module.exports = {
  addHandlers,
};