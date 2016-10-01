'use strict';

// const app = require('../app');

const failure = () => {
  console.log('fail');
};

const success = (data) => {
  console.log(data);
};

const getAllLists = (lists) => {
  console.log(lists);
  const allLists = require('../templates/allLists.handlebars');
  $('.all-lists').html(allLists(lists));
};

const searchForItems = (items) => {
  console.log(items);
};

const renderList = (data) => {
  let list = data.list;
  const singleList = require('../templates/singleList.handlebars');
  $('.profile-contents').html(singleList(list));
};

module.exports = {
  failure,
  success,
  getAllLists,
  searchForItems,
  renderList,
};