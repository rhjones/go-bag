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

const allLists = () => {
  let request = $.ajax({
    url: app.host + '/lists',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
  return request;
};

const allItems = () => {
  let request = $.ajax({
    url: app.host + '/items',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
  return request;
};

const addItemToList = (item) => {
  $.ajax({
    url: app.host + '/contents',
    method: 'POST',
    data: {
      content: {
        item_id: item.data,
        packed: false,
        list_id: 12,
      },
    },
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  })
  .done(function(data) {
    console.log(data);
  })
  .fail(function() {
    console.log('fail');
  });
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
};

module.exports = {
  newList,
  allLists,
  allItems,
  autocompleteOptions,
};