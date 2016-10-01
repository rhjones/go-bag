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

const renderListContents = (data) => {
  console.log(data.list.contents);
  let contents = data.list;
  const listContents = require('../templates/listContents.handlebars');
  $('.list-items').html(listContents(contents));
};

module.exports = {
  failure,
  success,
  getAllLists,
  searchForItems,
  renderListContents
};