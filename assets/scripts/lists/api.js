'use strict';

const app = require('../app');

const newList = (data) => {
  console.log('in api');
  let request = $.ajax({
    url: app.host + '/lists',
    method: 'POST',
    data: data,
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
  return request;
};

const getAllLists = () => {
 return $.ajax({
  url: app.host + '/lists',
  method: 'GET',
  headers: {
      Authorization: 'Token token=' + app.user.token,
    },
 });
};

const getList = (data) => {
  // data coming in to getList is either a list_id or an object containing a list.id
  let list_id = Number.isInteger(Number.parseInt(data, 10)) ? data : data.content.list.id;
  let request = $.ajax({
    url: app.host + '/lists/' + list_id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
  return request;
};

const addNewItem = (data) => {
  let request = $.ajax({
    url: app.host + '/items',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
  return request;
};

const addItemToList = (data, textStatus, jqXHR, contentData) => {
  console.log('data is', data);
  console.log('contentData is', contentData);
  data = contentData ? contentData : data;
  console.log('data inside of addItemToList is', data);
  data.content.packed = false;
  let request = $.ajax({
    url: app.host + '/contents',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
  return request;
};

const autocompleteOptions = {
  serviceUrl: app.host + '/items',
  transformResult: function (data) {
    // jQuery-autocomplete wants data to be formatted a specific way
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
  },
  onInvalidateSelection: function() {
    $(this).attr('data-id', '');
  },
  onSelect: function (suggestion) {
    $(this).attr('data-id', suggestion.data);
    console.log($(this));
  },
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

const deleteContent = (content_id) => {
  return $.ajax({
    url: app.host + '/contents/' + content_id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

module.exports = {
  newList,
  getList,
  autocompleteOptions,
  addItemToList,
  addNewItem,
  getAllLists,
  deleteList,
  deleteContent,
};