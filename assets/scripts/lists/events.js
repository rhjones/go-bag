'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onGetAllLists = () => {
  // if ($(event.target).is('a'))  {
    event.preventDefault();
  // 
  api.getAllLists()
    .done(ui.renderAllLists)
    .fail(ui.getFailure);
};

const onNewList = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.newList(data)
    .done(onGetAllLists)
    .fail(ui.createListFailure);
};

const onGetList = (data) => {
  console.log('data coming in to onGetList', data);
  let list_id = '';
  // if onGetList is called after deleting content
  if (Number.isInteger(Number.parseInt(data, 10))) {
    console.log('data is an integer');
    list_id = data;
  }
  // if onGetList is called because user selected a list
  else if ($(event.target).is('a') || $(event.target).is('i'))  {
    console.log('event.target', event.target);
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

const onCloneList = () => {
  event.preventDefault();
  let list_id = $(event.target).parents('li').attr('data-id');
  console.log(list_id);
  api.cloneList(list_id)
    .done(onGetAllLists)
    .fail(ui.createListFailure);
};

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

const onDeleteList = (event) => {
  event.preventDefault();
  let list_id = '';
  if ($(event.target).attr('data-id')) {
    list_id = $(event.target).attr('data-id');
  } else if ($(event.target).parents('form').attr('data-id')) {
    list_id = $(event.target).parents('form').attr('data-id');
  }
  console.log(list_id);
  api.deleteList(list_id)
    .done(onGetAllLists)
    .fail(ui.deleteListFailure);
};

const onDeleteContent = (event) => {
  event.preventDefault();
  let content_id = $(event.target).parent().attr('data-id');
  console.log('parent of event.target is', $(event.target).parents('ul'));
  let list_id = $(event.target).parents('ul').attr('data-id');
  console.log('list id is', list_id);
  api.deleteContent(content_id)
    .done(function() {
      console.log('successfully deleted content');
      onGetList(list_id);
    })
    .fail(ui.deleteItemFailure);
};

const onTogglePackedContent = (event) => {
  let content_id = $(event.target).parent().attr('data-id');
  console.log('content id', content_id);
  let packed = $(event.target).prop('checked');
  console.log('packed?', packed);
  let list_id = $(event.target).parents('ul').attr('data-id');
  console.log('list id is', list_id);
  let data = {
    content: {
      id: content_id,
      packed: packed,
    },
  };
  console.log(data);
  api.updateContent(data)
    .done(function() {
      onGetList(list_id);
    })
    .fail(ui.updateItemFailure);
};

const onEditList = (event) => {
  event.preventDefault();
  let title = $(event.target).parents('form').find('.list-title').html();
  console.log(title);
  ui.editListTitle(title);
};

const onCancelEditList = (event) => {
  event.preventDefault();
  let list_id = $(event.target).parents('form.add-item').attr('data-id');
  console.log(list_id);
  onGetList(list_id);
};

const onUpdateList = (event) => {
  event.preventDefault();
  let list_id = ($(event.target).parents('form.add-item').attr('data-id'));
  console.log(list_id);
  let formData = getFormFields(document.getElementsByClassName('add-item')[0]);
  console.log("edit list form data", formData);
  let data = {
    list: {
      id: list_id,
      title: formData.list.title,
    }
  };
  console.log('data', data);
  api.updateList(data)
    .done(function() {
      api.getList(list_id)
        .done(function(data) {
          ui.renderList(data);
          $('.item-search').autocomplete(api.autocompleteOptions);
        })
        .fail(ui.getFailure);
    })
    .fail(ui.failure);
};

const onToggleNewListForm = () => {
  event.preventDefault();
  ui.toggleNewListForm();
};

const addHandlers = () => {
  $('.view').on('click', 'a.view-list', onGetList);
  $('.view').on('submit', 'form.new-list-form', onNewList);
  $('.view').on('submit', 'form.add-item', onAddItemToList);
  $('.view').on('click', 'a.close-list', onGetAllLists);
  $('.view').on('click', 'a.delete-list', onDeleteList);
  $('.view').on('click', 'a.delete-content', onDeleteContent);
  $('.view').on('click', '.pack-content', onTogglePackedContent);
  $('.view').on('click', 'a.edit-list', onEditList);
  $('.view').on('click', 'a.update-list', onUpdateList);
  $('.view').on('click', 'a.cancel-edit-list', onCancelEditList);
  $('.view').on('click', 'a.clone-list', onCloneList);
  $('.view').on('click', 'a.new-list', onToggleNewListForm);
  $('.view').on('click', 'a.cancel-new-list', onToggleNewListForm);
};

module.exports = {
  addHandlers,
};