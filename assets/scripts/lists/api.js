'use strict';

const app = require('../app');

const getAllLists = () => {
 return $.ajax({
  url: app.host + '/lists',
  method: 'GET',
  headers: {
      Authorization: 'Token token=' + app.user.token,
    },
 });
};

const newList = (data) => {
  return $.ajax({
    url: app.host + '/lists',
    method: 'POST',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const getList = (data) => {
  // data coming in to getList is either a list_id or an object containing a list.id
  let list_id = Number.isInteger(Number.parseInt(data, 10)) ? data : data.content.list.id;
  return $.ajax({
    url: app.host + '/lists/' + list_id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const updateList = (data) => {
  return $.ajax({
    url: app.host + '/lists/' + data.list.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

const cloneList = (list_id) => {
  return $.ajax({
    url: app.host + '/clone/' + list_id,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: "{}",
  });
};

const deleteList = (list_id) => {
  return $.ajax({
    url: app.host + '/lists/' + list_id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const transformResults = (data) => {
  let searchResults = {
    suggestions: []
  };
  JSON.parse(data).items.forEach(function(item) {
    let suggestion = {};
    suggestion.value = item.name;
    suggestion.data = item.id;
    searchResults.suggestions.push(suggestion);
  });
  return searchResults;
};

// using https://github.com/devbridge/jQuery-Autocomplete
const autocompleteOptions = {
  serviceUrl: app.host + '/items',
  transformResult: transformResults,
  onInvalidateSelection: function() {
    $(this).attr('data-id', '');
  },
  onSelect: function (suggestion) {
    $(this).attr('data-id', suggestion.data);
  },
};

const addNewItem = (data) => {
  return $.ajax({
    url: app.host + '/items',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

const addItemToList = (data, textStatus, jqXHR, contentData) => {
  data = contentData ? contentData : data;
  data.content.packed = false;
  return $.ajax({
    url: app.host + '/contents',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

const deleteContent = (content_id) => {
  return $.ajax({
    url: app.host + '/contents/' + content_id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const updateContent = (data) => {
  return $.ajax({
    url: app.host + '/contents/' + data.content.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

module.exports = {
  getAllLists,
  newList,
  getList,
  updateList,
  cloneList,
  deleteList,
  autocompleteOptions,
  addNewItem,
  addItemToList,
  deleteContent,
  updateContent,
};