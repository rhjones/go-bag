'use strict';

// const app = require('../app');

const failure = (jqXHR, textStatus, errorThrown) => {
  console.log('fail');
  console.log(textStatus);
  console.error(errorThrown);
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
  $('.all-lists').html(allLists(lists));
};

module.exports = {
  failure,
  success,
  searchForItems,
  renderList,
  renderAllLists
};